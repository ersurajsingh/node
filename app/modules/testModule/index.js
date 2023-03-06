import Utils from "../../utils";
import BLManager from "./manger";
import httpHandler from "../../utils/httpHandler";
import LHTLogger from "../../utils/logger";

export default class Index {
  async successRoute(request, response) {
    LHTLogger.info("TestController", "successMethod", request.query, "Guna R");
    const [error, testResponse] = await Utils.parseResponse(
      new BLManager().successMethod(request.query)
    );
    if (!testResponse) return httpHandler.error(response, error, error ? error.message : "");
    return httpHandler.success(response, testResponse);
  };

  async failureRoute(request, response) {
    LHTLogger.info("TestController", "failureMethod", request.query, "Guna R");
    const [error, testResponse] = await Utils.parseResponse(
      new BLManager().failureMethod(request.query)
    );
    if (!testResponse) return httpHandler.error(response, error, error ? error.message : "");
    return httpHandler.success(response, testResponse);
  };
}
