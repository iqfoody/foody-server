import defaultProcessRequest from "./processRequest";
export default function graphqlUploadKoa({ processRequest, ...processRequestOptions }?: {
    processRequest?: typeof defaultProcessRequest;
}): (ctx: any, next: any) => Promise<any>;
