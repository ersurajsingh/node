const request = require("request");
import axios from "axios";

//todo: use axios
export default class HTTPService {
  /**
   * This function is made to execute http request!
   * @param method
   * @param hostname
   * @param path
   * @param headers
   * @param data
   */
  static async executeHTTPRequest(method, hostname, path, headers, data) {
    return await new Promise(function (fulfill, reject) {
      request(
        {
          url: hostname + path,
          method: method,
          headers: headers,
          json: data,
        },
        function (error, response, body) {
          if (error) {
            lhtWebLog.error("executeHTTPRequest", error.message, error);
            reject(error);
          } else {
            fulfill(body);
          }
        }
      );
    });
  }
}

