import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from "../common/constants";
import LHTLogger from "./logger";

export default class HTTPHandler {
  success(res, data, message = apiSuccessMessage.FETCH_SUCCESS) {
    HTTPHandler.response(
      res,
      data,
      message,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  accepted(res, data, message = apiSuccessMessage.POST_SUCCESS_MESSAGE) {
    HTTPHandler.response(
      res,
      data,
      message,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  unauthorized(res, data, message) {
    HTTPHandler.response(
      res,
      data,
      message,
      httpConstants.RESPONSE_STATUS.FAILURE,
      httpConstants.RESPONSE_CODES.UNAUTHORIZED
    );
  }

  badRequest(res, data, message) {
    HTTPHandler.response(
      res,
      data,
      message,
      httpConstants.RESPONSE_STATUS.FAILURE,
      httpConstants.RESPONSE_CODES.BAD_REQUEST
    );
  }

  notFoundError(res, data, message) {
    HTTPHandler.response(
      res,
      data,
      message,
      httpConstants.RESPONSE_STATUS.FAILURE,
      httpConstants.RESPONSE_CODES.NOT_FOUND
    );
  }

  error(res, error, message = apiFailureMessage.INTERNAL_SERVER_ERROR) {
    LHTLogger.error("HTTPHandler:error", message, error, error ? error.stack : "", "Guna R");
    const statusCode = (error && error.statusCode) ? error.statusCode : httpConstants.RESPONSE_CODES.SERVER_ERROR;
    HTTPHandler.response(
      res,
      error,
      message,
      httpConstants.RESPONSE_STATUS.FAILURE,
      statusCode
    );
  }

  validationError(res, errorArray) {
    HTTPHandler.response(
      res,
      errorArray,
      "Invalid Request!",
      httpConstants.RESPONSE_STATUS.FAILURE,
      httpConstants.RESPONSE_CODES.SERVER_ERROR
    );
  }

  response(res, data, message, success, code) {
    const responseObj = {
      responseData: data,
      message: message,
      success: success,
      responseCode: code,
    };
    res.status(code)
    res.format({
      json: () => {
        res.send(responseObj);
      },
    });
  }
}
