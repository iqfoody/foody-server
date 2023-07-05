export class ReadAfterDestroyedError extends Error {
}
export class ReadAfterReleasedError extends Error {
}
export class ReadStream extends Readable {
    constructor(writeStream: any, options: any);
    _pos: number;
    _writeStream: any;
    _read(n: any): void;
}
export class WriteStream extends Writable {
    constructor(options: any);
    _fd: number;
    _path: string;
    _pos: number;
    _readStreams: Set<any>;
    _released: boolean;
    _cleanup: (callback: any) => void;
    _cleanupSync: () => void;
    _final(callback: any): void;
    _write(chunk: any, encoding: any, callback: any): void;
    release(): void;
    _destroy(error: any, callback: any): void;
    createReadStream(options: any): ReadStream;
}
declare namespace _default {
    export { WriteStream };
    export { ReadStream };
    export { ReadAfterDestroyedError };
    export { ReadAfterReleasedError };
}
export default _default;
import { Readable } from "stream";
import { Writable } from "stream";
