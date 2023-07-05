export default function processRequest(request: any, response: any, { maxFieldSize, maxFileSize, maxFiles, }?: {
    maxFieldSize?: number;
    maxFileSize?: number;
    maxFiles?: number;
}): Promise<unknown>;
