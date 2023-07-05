import defaultProcessRequest from "./processRequest";
export default function graphqlUploadExpress({ processRequest, ...processRequestOptions }?: {
    processRequest?: typeof defaultProcessRequest;
}): (request: any, response: any, next: any) => any;
