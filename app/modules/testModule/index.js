import Utils from "../../utils";
import BLManager from "./manger";
import HTTPHandler from "../../utils/HTTPHandler";

export default class Index {
  async successRoute(request, response) {
    lhtWebLog.info("TestController", "successMethod", request.query);
    const [error, testResponse] = await Utils.parseResponse(
      new BLManager().successMethod(request.query)
    );
    if (!testResponse) return HTTPHandler.error(response, error);
    return HTTPHandler.success(response, testResponse);
  }
  async failureRoute(request, response) {
    lhtWebLog.info("TestController", "failureMethod", request.query);
    const [error, testResponse] = await Utils.parseResponse(
      new BLManager().failureMethod(request.query)
    );
    if (!testResponse) return HTTPHandler.error(response, error);
    return HTTPHandler.success(response, testResponse);
  }
}
