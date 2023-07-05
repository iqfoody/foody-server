"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processRequest_1 = __importDefault(require("./processRequest"));
function graphqlUploadKoa({ processRequest = processRequest_1.default, ...processRequestOptions } = {}) {
    async function graphqlUploadKoaMiddleware(ctx, next) {
        if (!ctx.request.is("multipart/form-data"))
            return next();
        const requestEnd = new Promise((resolve) => ctx.req.on("end", resolve));
        try {
            ctx.request.body = await processRequest(ctx.req, ctx.res, processRequestOptions);
            await next();
        }
        finally {
            await requestEnd;
        }
    }
    return graphqlUploadKoaMiddleware;
}
exports.default = graphqlUploadKoa;
//# sourceMappingURL=graphqlUploadKoa.js.map