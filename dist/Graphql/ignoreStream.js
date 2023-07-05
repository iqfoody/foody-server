"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ignoreStream(stream) {
    stream.on("error", () => { });
    stream.resume();
}
exports.default = ignoreStream;
//# sourceMappingURL=ignoreStream.js.map