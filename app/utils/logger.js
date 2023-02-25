import Config from "../../config";
import Utils from "./index";
import { httpConstants } from "../common/constants";

export default class LHTLogger {
  static info(functionName, message, payload = {}, devAlias = "") {
    LHTLogger.log(
      functionName,
      message,
      payload,
      devAlias,
      httpConstants.LOG_LEVEL_TYPE.INFO
    );
  }

  static debug(functionName, message, payload = {}, devAlias = "") {
    LHTLogger.log(
      functionName,
      message,
      payload,
      devAlias,
      httpConstants.LOG_LEVEL_TYPE.DEBUG
    );
  }

  static warn(functionName, message, payload = {}, devAlias = "") {
    LHTLogger.log(
      functionName,
      message,
      payload,
      devAlias,
      httpConstants.LOG_LEVEL_TYPE.WARN
    );
  }

  static error(functionName, message, payload = {}, devAlias = "", errorStack) {
    const errorOrigin = LHTLogger.parseErrorStack(errorStack);
    LHTLogger.log(
      functionName,
      message,
      payload,
      devAlias,
      httpConstants.LOG_LEVEL_TYPE.ERROR,
      errorOrigin
    );
  }

  static log(functionName, message, payload, devAlias, logType, errorOrigin = "") {
    if (Config.IS_CONSOLE_LOG !== "true" && logType !== httpConstants.LOG_LEVEL_TYPE.ERROR ) return;
    let logString = `[${Utils.getFormattedDate()}] ${logType} ${errorOrigin}: ${functionName}: ${message}: ${JSON.stringify(
      payload
    )}: Developer : ${devAlias}`;
    switch (logType) {
      case httpConstants.LOG_LEVEL_TYPE.WARN:
        console.warn(logString);
        break;
      case httpConstants.LOG_LEVEL_TYPE.DEBUG:
        console.debug(logString);
        break;
      case httpConstants.LOG_LEVEL_TYPE.ERROR:
        console.error(logString);
        break;
      default:
        console.log(logString);
    }
  }
  static parseErrorStack(errorStack) {
    let errorOrigin;
    try {
      if (errorStack) {
          const [fullPath, Function] = errorStack.split('\n')[1].match(/at (.+) \((.+):(\d+):\d+\)/);
          const filePath = '/app/';
          errorOrigin = `at ${Function} ${filePath}${fullPath.split(filePath).pop().replace(/\)/g, '')}`;
        return errorOrigin;
      }
    } catch (_) {}
    
  }
}
