import Utils from "../../utils";
import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from "../../common/constants";
import BLManager from "./manger";
import HTTPHandler from "../../utils/HTTPHandler";

export default class Index {
  async testRoute(request, response) {
    lhtWebLog.info("TestController", "testRoute", request.body);
    const [error, testResponse] = await Utils.parseResponse(
      new BLManager().testMethod(request.body)
    );
    if (!testResponse)
      return HTTPHandler.error(
        response,
        error,
        apiFailureMessage.INTERNAL_SERVER_ERROR
      );

    return HTTPHandler.success(
      response,
      testResponse,
      apiSuccessMessage.FETCH_SUCCESS
    );
  }
}
