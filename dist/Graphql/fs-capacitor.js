"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteStream = exports.ReadStream = exports.ReadAfterReleasedError = exports.ReadAfterDestroyedError = void 0;
const crypto_1 = require("crypto");
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = require("path");
const stream_1 = require("stream");
const events_1 = require("events");
class ReadAfterDestroyedError extends Error {
}
exports.ReadAfterDestroyedError = ReadAfterDestroyedError;
class ReadAfterReleasedError extends Error {
}
exports.ReadAfterReleasedError = ReadAfterReleasedError;
const processExitProxy = new events_1.EventEmitter();
processExitProxy.setMaxListeners(Infinity);
process.once("exit", () => processExitProxy.emit("exit"));
class ReadStream extends stream_1.Readable {
    constructor(writeStream, options) {
        super({
            highWaterMark: options === null || options === void 0 ? void 0 : options.highWaterMark,
            encoding: options === null || options === void 0 ? void 0 : options.encoding,
            autoDestroy: true,
        });
        this._pos = 0;
        this._writeStream = writeStream;
    }
    _read(n) {
        if (this.destroyed)
            return;
        if (typeof this._writeStream["_fd"] !== "number") {
            this._writeStream.once("ready", () => this._read(n));
            return;
        }
        const buf = Buffer.allocUnsafe(n);
        (0, fs_1.read)(this._writeStream["_fd"], buf, 0, n, this._pos, (error, bytesRead) => {
            if (error)
                this.destroy(error);
            if (bytesRead) {
                this._pos += bytesRead;
                this.push(buf.slice(0, bytesRead));
                return;
            }
            if (this._writeStream._writableState.finished) {
                if (this._pos < this._writeStream._pos)
                    this._read(n);
                else
                    this.push(null);
                return;
            }
            const retry = () => {
                this._writeStream.off("finish", retry);
                this._writeStream.off("write", retry);
                this._read(n);
            };
            this._writeStream.on("finish", retry);
            this._writeStream.on("write", retry);
        });
    }
}
exports.ReadStream = ReadStream;
class WriteStream extends stream_1.Writable {
    constructor(options) {
        super({
            highWaterMark: options === null || options === void 0 ? void 0 : options.highWaterMark,
            defaultEncoding: options === null || options === void 0 ? void 0 : options.defaultEncoding,
            autoDestroy: false,
        });
        this._fd = null;
        this._path = null;
        this._pos = 0;
        this._readStreams = new Set();
        this._released = false;
        this._cleanup = (callback) => {
            const fd = this._fd;
            const path = this._path;
            if (typeof fd !== "number" || typeof path !== "string") {
                callback(null);
                return;
            }
            (0, fs_1.close)(fd, (closeError) => {
                (0, fs_1.unlink)(path, (unlinkError) => {
                    this._fd = null;
                    processExitProxy.off("exit", this._cleanupSync);
                    callback(unlinkError !== null && unlinkError !== void 0 ? unlinkError : closeError);
                });
            });
        };
        this._cleanupSync = () => {
            processExitProxy.off("exit", this._cleanupSync);
            if (typeof this._fd === "number")
                try {
                    (0, fs_1.closeSync)(this._fd);
                }
                catch (error) {
                }
            try {
                if (this._path !== null) {
                    (0, fs_1.unlinkSync)(this._path);
                }
            }
            catch (error) {
            }
        };
        (0, crypto_1.randomBytes)(16, (error, buffer) => {
            var _a;
            if (error) {
                this.destroy(error);
                return;
            }
            this._path = (0, path_1.join)(((_a = options === null || options === void 0 ? void 0 : options.tmpdir) !== null && _a !== void 0 ? _a : os_1.tmpdir)(), `capacitor-${buffer.toString("hex")}.tmp`);
            (0, fs_1.open)(this._path, "wx+", 0o600, (error, fd) => {
                if (error) {
                    this.destroy(error);
                    return;
                }
                processExitProxy.once("exit", this._cleanupSync);
                this._fd = fd;
                this.emit("ready");
            });
        });
    }
    _final(callback) {
        if (typeof this._fd !== "number") {
            this.once("ready", () => this._final(callback));
            return;
        }
        callback();
    }
    _write(chunk, encoding, callback) {
        if (typeof this._fd !== "number") {
            this.once("ready", () => this._write(chunk, encoding, callback));
            return;
        }
        (0, fs_1.write)(this._fd, chunk, 0, chunk.length, this._pos, (error) => {
            if (error) {
                callback(error);
                return;
            }
            this._pos += chunk.length;
            this.emit("write");
            callback();
        });
    }
    release() {
        this._released = true;
        if (this._readStreams.size === 0)
            this.destroy();
    }
    _destroy(error, callback) {
        for (const readStream of this._readStreams) {
            readStream.destroy(error || undefined);
        }
        if (typeof this._fd === "number" && typeof this._path === "string") {
            this._cleanup((cleanupError) => callback(cleanupError !== null && cleanupError !== void 0 ? cleanupError : error));
            return;
        }
        this.once("ready", () => {
            this._cleanup((cleanupError) => {
                if (cleanupError) {
                    this.emit("error", cleanupError);
                }
            });
        });
        callback(error);
    }
    createReadStream(options) {
        if (this.destroyed)
            throw new ReadAfterDestroyedError("A ReadStream cannot be created from a destroyed WriteStream.");
        if (this._released)
            throw new ReadAfterReleasedError("A ReadStream cannot be created from a released WriteStream.");
        const readStream = new ReadStream(this, options);
        this._readStreams.add(readStream);
        readStream.once("close", () => {
            this._readStreams.delete(readStream);
            if (this._released && this._readStreams.size === 0) {
                this.destroy();
            }
        });
        return readStream;
    }
}
exports.WriteStream = WriteStream;
exports.default = {
    WriteStream,
    ReadStream,
    ReadAfterDestroyedError,
    ReadAfterReleasedError,
};
//# sourceMappingURL=fs-capacitor.js.map