
import defaultProcessRequest from "./processRequest";

export default function graphqlUploadExpress({
  processRequest = defaultProcessRequest,
  ...processRequestOptions
} = {}) {

  function graphqlUploadExpressMiddleware(request, response, next) {
    if (!request.is("multipart/form-data")) return next();

    const requestEnd = new Promise((resolve) => request.on("end", resolve));
    const { send } = response;
    response.send =
      (...args) => {
        requestEnd.then(() => {
          response.send = send;
          response.send(...args);
        });
      };

    processRequest(request, response, processRequestOptions)
      .then((body) => {
        request.body = body;
        next();
      })
      .catch((error) => {
        if (error.status && error.expose) response.status(error.status);
        next(error);
      });
  }

  return graphqlUploadExpressMiddleware;
}
