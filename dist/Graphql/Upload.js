"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Upload {
    promise;
    resolve;
    file;
    reject;
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = (file) => {
                this.file = file;
                resolve(file);
            };
            this.reject = reject;
        });
        this.promise.catch(() => { });
    }
}
exports.default = Upload;
//# sourceMappingURL=Upload.js.map