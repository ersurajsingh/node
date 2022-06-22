import APP from "express";
import DBConnection from "./config/dbConnection";
import LhtLogger from "./app/utils/logger";
import Config from "./config";
import routes from "./routes";

const app = new APP();
require("./config/express")(app);
global.lhtWebLog = LhtLogger;

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
