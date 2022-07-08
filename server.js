import APP from "express";
import DBConnection from "./config/dbConnection";
import LhtLogger from "./app/utils/logger";
import HTTPHandler from "./app/utils/HTTPHandler";
import Config from "./config";
import routes from "./routes";

const app = new APP();
require("./config/express")(app);
global.lhtWebLog = LhtLogger;
global.httpResponse = HTTPHandler;

class Server {
  static listen() {
    Promise.all([DBConnection.connect()])
      .then(() => {
        app.listen(Config.PORT);
        lhtWebLog.info("Server:listen", `Server Started on ${Config.PORT}`);
        routes(app);
        require("./config/jobInitializer");
      })
      .catch((error) =>
        lhtWebLog.error("Server:listen", "failed to connect", { err: error })
      );
  }
}

Server.listen();
