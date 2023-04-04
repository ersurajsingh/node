import LHTLogger from '../../utils/logger';

export default class Manger {
  async successMethod() {
    // API business logic
    LHTLogger.info('testModule:successMethod', 'Api success', {}, 'Guna R');
    return true;
  }

  async failureMethod() {
    const error = new Error();
    error.statusCode = 404; // optional custom status code
    // LHTLogger.error("testModule:failureMethod", "Api Faliure", {}, "", error.stack, "Guna R");
    throw error;
  }
}
