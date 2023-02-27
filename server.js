import APP from "express";
import DBConnection from "./config/dbConnection";
import LhtLogger from "./app/utils/logger";
import HTTPHandler from "./app/utils/HTTPHandler";
import Config from "./config";
import routes from "./routes";

const app = new APP();
require("./config/express")(app);
global.httpResponse = HTTPHandler;

class Server {
  static async listen() {
    try {
      await DBConnection.connect()
      app.listen(Config.PORT);
      routes(app);
      require("./config/jobInitializer");
      LhtLogger.info("Server:listen", `Server Started on ${Config.PORT}`);
    } catch (error) {
      LhtLogger.error("Server:listen", "failed to connect", { err: error })
    }
  }
}

Server.listen();
module.exports = app;
