"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const busboy_1 = __importDefault(require("busboy"));
const http_errors_1 = __importDefault(require("http-errors"));
const object_path_1 = __importDefault(require("object-path"));
const GRAPHQL_MULTIPART_REQUEST_SPEC_URL_1 = __importDefault(require("./GRAPHQL_MULTIPART_REQUEST_SPEC_URL"));
const ignoreStream_1 = __importDefault(require("./ignoreStream"));
const Upload_1 = __importDefault(require("./Upload"));
const fs_capacitor_1 = require("./fs-capacitor");
function processRequest(request, response, { maxFieldSize = 1000000, maxFileSize = Infinity, maxFiles = Infinity, } = {}) {
    return new Promise((resolve, reject) => {
        let released;
        let exitError;
        let operations;
        let operationsPath;
        let map;
        const parser = (0, busboy_1.default)({
            headers: request.headers,
            defParamCharset: "utf8",
            limits: {
                fieldSize: maxFieldSize,
                fields: 2,
                fileSize: maxFileSize,
                files: maxFiles,
            },
        });
        function exit(error, isParserError = false) {
            if (exitError)
                return;
            exitError = error;
            if (map)
                for (const upload of map.values())
                    if (!upload.file)
                        upload.reject(exitError);
            isParserError ? parser.destroy() : parser.destroy(exitError);
            request.unpipe(parser);
            setImmediate(() => {
                request.resume();
            });
            reject(exitError);
        }
        parser.on("field", (fieldName, value, { valueTruncated }) => {
            if (valueTruncated)
                return exit((0, http_errors_1.default)(413, `The ‘${fieldName}’ multipart field value exceeds the ${maxFieldSize} byte size limit.`));
            switch (fieldName) {
                case "operations":
                    try {
                        operations = JSON.parse(value);
                    }
                    catch (error) {
                        return exit((0, http_errors_1.default)(400, `Invalid JSON in the ‘operations’ multipart field (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL_1.default}).`));
                    }
                    if (typeof operations !== "object" || !operations)
                        return exit((0, http_errors_1.default)(400, `Invalid type for the ‘operations’ multipart field (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL_1.default}).`));
                    operationsPath = (0, object_path_1.default)(operations);
                    break;
                case "map": {
                    if (!operations)
                        return exit((0, http_errors_1.default)(400, `Misordered multipart fields; ‘map’ should follow ‘operations’ (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL_1.default}).`));
                    let parsedMap;
                    try {
                        parsedMap = JSON.parse(value);
                    }
                    catch (error) {
                        return exit((0, http_errors_1.default)(400, `Invalid JSON in the ‘map’ multipart field (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL_1.default}).`));
                    }
                    if (typeof parsedMap !== "object" ||
                        !parsedMap ||
                        Array.isArray(parsedMap))
                        return exit((0, http_errors_1.default)(400, `Invalid type for the ‘map’ multipart field (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL_1.default}).`));
                    const mapEntries = Object.entries(parsedMap);
                    if (mapEntries.length > maxFiles)
                        return exit((0, http_errors_1.default)(413, `${maxFiles} max file uploads exceeded.`));
                    map = new Map();
                    for (const [fieldName, paths] of mapEntries) {
                        if (!Array.isArray(paths))
                            return exit((0, http_errors_1.default)(400, `Invalid type for the ‘map’ multipart field entry key ‘${fieldName}’ array (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL_1.default}).`));
                        map.set(fieldName, new Upload_1.default());
                        for (const [index, path] of paths.entries()) {
                            if (typeof path !== "string")
                                return exit((0, http_errors_1.default)(400, `Invalid type for the ‘map’ multipart field entry key ‘${fieldName}’ array index ‘${index}’ value (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL_1.default}).`));
                            try {
                                operationsPath.set(path, map.get(fieldName));
                            }
                            catch (error) {
                                return exit((0, http_errors_1.default)(400, `Invalid object path for the ‘map’ multipart field entry key ‘${fieldName}’ array index ‘${index}’ value ‘${path}’ (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL_1.default}).`));
                            }
                        }
                    }
                    resolve(operations);
                }
            }
        });
        parser.on("file", (fieldName, stream, { filename, encoding, mimeType: mimetype }) => {
            if (!map) {
                (0, ignoreStream_1.default)(stream);
                return exit((0, http_errors_1.default)(400, `Misordered multipart fields; files should follow ‘map’ (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL_1.default}).`));
            }
            const upload = map.get(fieldName);
            if (!upload) {
                (0, ignoreStream_1.default)(stream);
                return;
            }
            let fileError;
            const capacitor = new fs_capacitor_1.WriteStream();
            capacitor.on("error", () => {
                stream.unpipe();
                stream.resume();
            });
            stream.on("limit", () => {
                fileError = (0, http_errors_1.default)(413, `File truncated as it exceeds the ${maxFileSize} byte size limit.`);
                stream.unpipe();
                capacitor.destroy(fileError);
            });
            stream.on("error", (error) => {
                fileError = error;
                stream.unpipe();
                capacitor.destroy(fileError);
            });
            const file = {
                filename,
                mimetype,
                encoding,
                createReadStream(options) {
                    const error = fileError || (released ? exitError : null);
                    if (error)
                        throw error;
                    return capacitor.createReadStream(options);
                },
                capacitor,
            };
            Object.defineProperty(file, "capacitor", {
                enumerable: false,
                configurable: false,
                writable: false,
            });
            stream.pipe(capacitor);
            upload.resolve(file);
        });
        parser.once("filesLimit", () => exit((0, http_errors_1.default)(413, `${maxFiles} max file uploads exceeded.`)));
        parser.once("finish", () => {
            request.unpipe(parser);
            request.resume();
            if (!operations)
                return exit((0, http_errors_1.default)(400, `Missing multipart field ‘operations’ (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL_1.default}).`));
            if (!map)
                return exit((0, http_errors_1.default)(400, `Missing multipart field ‘map’ (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL_1.default}).`));
            for (const upload of map.values())
                if (!upload.file)
                    upload.reject((0, http_errors_1.default)(400, "File missing in the request."));
        });
        parser.on("error", (error) => {
            exit(error, true);
        });
        response.once("close", () => {
            released = true;
            if (map)
                for (const upload of map.values())
                    if (upload.file)
                        upload.file.capacitor.release();
        });
        request.once("close", () => {
            if (!request.readableEnded)
                exit((0, http_errors_1.default)(499, "Request disconnected during file upload stream parsing."));
        });
        request.pipe(parser);
    });
}
exports.default = processRequest;
//# sourceMappingURL=processRequest.js.map