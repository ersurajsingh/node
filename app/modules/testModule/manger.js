import LHTLogger from "../../utils/logger";

export default class Manger {
  successMethod = async (requestData) => {
    // API business logic
    LHTLogger.info("testModule:successMethod", "Api success");
    return true;
  };

  failureMethod = async (requestData) => {
    const error = new Error();
    error.statusCode = 404; // optional custom status code
    // LHTLogger.error("testModule:failureMethod", "Api Faliure", {}, "", error.stack);
    throw error
  };
}
