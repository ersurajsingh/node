import JobController from "../app/modules/jobs";
import cron from "node-cron";

/*
  ┌────────────── second(optional)
  │ ┌──────────── minute
  │ │ ┌────────── hour
  │ │ │ ┌──────── day of month
  │ │ │ │ ┌────── month
  │ │ │ │ │ ┌──── day of week
  * * * * * *
*/
cron.schedule('* * * * *', async () => {
  lhtWebLog.info("Cron:schedule", "cron job running");
  await JobController.monitorMeter();
});
