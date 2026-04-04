import cron from "node-cron";
import Internship from "../models/Internship.js";
import User from "../models/User.js";
import sendEmail from "./sendEmail.js";

const startCronJobs = () => {

  // Runs every minute
  cron.schedule("* * * * *", async () => {
    console.log("Checking reminders...");

    const now = new Date();

    try {
      const internships = await Internship.find({
        reminderDate: { $lte: now },
      });

      for (let internship of internships) {

        // Get user email
        const user = await User.findById(internship.userId);

        if (!user) continue;

        const message = `
Reminder: You have an update for ${internship.companyName}
Role: ${internship.role}
Status: ${internship.status}
`;

        await sendEmail(user.email, "Internship Reminder", message);

        // Remove reminderDate so it doesn't send again
        internship.reminderDate = null;
        await internship.save();
      }

    } catch (error) {
      console.error(error.message);
    }
  });

};

export default startCronJobs;