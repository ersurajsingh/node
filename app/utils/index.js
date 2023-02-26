/**
 * Created by AyushK on 18/09/20.
 */

"use strict";

import { apiFailureMessage, httpConstants } from "../common/constants";

export default class Utils {
  /**
   * This function is made to handle success and error callback!
   * @param promise
   * @returns {Promise<Promise|Bluebird<*[] | R>|Bluebird<any | R>|*|Promise<T | *[]>>}
   */
  static async parseResponse(promise) {
    return promise
      .then((data) => {
        return [null, data];
      })
      .catch((err) => [err]);
  }

  static returnRejection(
    message = apiFailureMessage.INTERNAL_SERVER_ERROR,
    statusCode = httpConstants.RESPONSE_CODES.SERVER_ERROR
  ) {
    return Promise.reject({ message, statusCode });
  }

  static getFormattedDate() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }
}
