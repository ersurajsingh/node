import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from "../common/constants";
import LHTLogger from "./logger";

export default class httpHandler {
  static success(res, data, message = apiSuccessMessage.FETCH_SUCCESS) {
    httpHandler.response(
      res,
      data,
      message,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

 static accepted(res, data, message = apiSuccessMessage.POST_SUCCESS_MESSAGE) {
    httpHandler.response(
      res,
      data,
      message,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  static unauthorized(res, data, message) {
    httpHandler.response(
      res,
      data,
      message,
      httpConstants.RESPONSE_STATUS.FAILURE,
      httpConstants.RESPONSE_CODES.UNAUTHORIZED
    );
  }

 static badRequest(res, data, message) {
    httpHandler.response(
      res,
      data,
      message,
      httpConstants.RESPONSE_STATUS.FAILURE,
      httpConstants.RESPONSE_CODES.BAD_REQUEST
    );
  }

  static notFoundError(res, data, message) {
    httpHandler.response(
      res,
      data,
      message,
      httpConstants.RESPONSE_STATUS.FAILURE,
      httpConstants.RESPONSE_CODES.NOT_FOUND
    );
  }

  static error(res, error, message = apiFailureMessage.INTERNAL_SERVER_ERROR) {
    LHTLogger.error("httpHandler:error", message, error, error ? error.stack : "", "Guna R");
    const statusCode = (error && error.statusCode) ? error.statusCode : httpConstants.RESPONSE_CODES.SERVER_ERROR;
    httpHandler.response(
      res,
      error,
      message,
      httpConstants.RESPONSE_STATUS.FAILURE,
      statusCode
    );
  }

  static validationError(res, errorArray) {
    httpHandler.response(
      res,
      errorArray,
      "Invalid Request!",
      httpConstants.RESPONSE_STATUS.FAILURE,
      httpConstants.RESPONSE_CODES.SERVER_ERROR
    );
  }

  static response(res, data, message, success, code) {
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
