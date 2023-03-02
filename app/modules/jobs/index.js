import BLManager from "./manager";
import LHTLogger from "../../utils/logger";

export default class JobController {
  async monitorMeter() {
    await BLManager.monitorMeters().catch((err) =>
      LHTLogger.error(`monitorMeter`, "Job Failed", err)
    );
  }
}
