export default class Upload {
    promise: Promise<any>;
    resolve: (file: any) => void;
    file: any;
    reject: (reason?: any) => void;
    constructor();
}
