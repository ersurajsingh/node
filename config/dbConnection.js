import Config from ".";
import mongoose from "mongoose";

export default class DBConnection {
  static connect() {
    lhtWebLog.info("DBConnection", `DB trying to connect with ${Config.DB}`);

    const options = {
      keepAlive: 1,
      poolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    return mongoose.connect(Config.DB, options);
  }
}
