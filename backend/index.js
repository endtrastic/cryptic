require('dotenv').config({ path: './.env' })
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dataRoutes = require('./router/authRoutes');
const app = express();
const http = require("http");
const server = http.createServer(app);
const cron = require("node-cron");
const { getData, DelTable } = require('./controller/handleinfo');




PORTfavor = process.env.PORT



console.log("DB HOST, AND THE JWT TOKEN:", process.env.DB_HOST, process.env.JWT_TOKEN);




app.use(express.json());
app.use(cookieParser());



app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
  })
);
//  0 0 * * 0 every week sunday runs whatever the fuck


cron.schedule('0 0 * * 0', async () => {
  console.log("Running this truncate tables func every Sunday on 0:00")
  try {
    await DelTable();
  } catch (error) {
    console.error("Error", error)
  }
});

cron.schedule('1 0 * * 0', async () => {
  console.log("fetching data every Sunday at 0:01")
  try {
    await getData();
  } catch (error) {
    console.error("Error", error)
  }
});

// Testing rn

cron.schedule('* * * * *', async () => {
  console.log("fetching data every Sunday at 0:01")
  try {
    await getData();
  } catch (error) {
    console.error("Error", error)
  }
});


app.use('/api', dataRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/auth/verify", (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    return res.json({ authenticated: true, id: decoded.id });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  return res.json({ message: "Logged out successfully" });
});







app.get("/", (req, res) => {
  res.send("Server is running i hope!!");

});



server.listen(PORTfavor, () => {
  console.log(`Server running on http://localhost:${PORTfavor}`);
});
