import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to verify that time of visit is within working hours

function workingHoursCheckMiddleware(req, res, next) {
  const currentDate = new Date();

  //   To know the day of visit since Saturdays and Sundays are not working days
  const currentDay = currentDate.getDay();
  //   To get the time of visit
  const currentHour = currentDate.getHours();

  // To know if day of visit is working day
  const isWorkingDay = currentDay >= 1 && currentDay <= 5;

  // To know if time of visit is within working hours
  const isWorkingHour = currentHour >= 9 && currentHour < 17;

  if (isWorkingDay && isWorkingHour) {
    next();
  } else {
    res
      .status(403)
      .send("Sorry, you're only allowed to visit during working hours");
  }
}

// Applying the middleware to all frontend routes

app.use(workingHoursCheckMiddleware);

// Getting the frontend pages through the server
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "services.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
