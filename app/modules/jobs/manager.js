import LHTLogger from "../../utils/logger"

export default class BLManager {
  static async monitorMeters () {
    // Cron Job Business logic-
    LHTLogger.info("JobManager:monitorMeters", "monitoring");
    return true
  }
}
