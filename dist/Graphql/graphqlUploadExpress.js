"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processRequest_1 = __importDefault(require("./processRequest"));
function graphqlUploadExpress({ processRequest = processRequest_1.default, ...processRequestOptions } = {}) {
    function graphqlUploadExpressMiddleware(request, response, next) {
        if (!request.is("multipart/form-data"))
            return next();
        const requestEnd = new Promise((resolve) => request.on("end", resolve));
        const { send } = response;
        response.send =
            (...args) => {
                requestEnd.then(() => {
                    response.send = send;
                    response.send(...args);
                });
            };
        processRequest(request, response, processRequestOptions)
            .then((body) => {
            request.body = body;
            next();
        })
            .catch((error) => {
            if (error.status && error.expose)
                response.status(error.status);
            next(error);
        });
    }
    return graphqlUploadExpressMiddleware;
}
exports.default = graphqlUploadExpress;
//# sourceMappingURL=graphqlUploadExpress.js.map