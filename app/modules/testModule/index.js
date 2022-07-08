import Utils from "../../utils";
import BLManager from "./manger";
import HTTPHandler from "../../utils/HTTPHandler";

export default class Index {
  async testRoute(request, response) {
    lhtWebLog.info("TestController", "testRoute", request.body);
    const [error, testResponse] = await Utils.parseResponse(
      new BLManager().testMethod(request.body)
    );
    if (!testResponse) return HTTPHandler.error(response, error);
    return HTTPHandler.success(response, testResponse);
  }
}
