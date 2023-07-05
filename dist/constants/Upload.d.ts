/// <reference types="node" />
import { Stream } from "stream";
interface Upload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Promise<Stream>;
}
export default Upload;
