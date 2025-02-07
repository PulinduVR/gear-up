import app from "./app.js";
import connectDB from "./config/connection.js";
// import "./cron.js";

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
