require('dotenv').config({ path: './.env' })
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dataRoutes = require('./router/authRoutes');
const app = express();
const http = require("http");
const server = http.createServer(app);




PORTfavor = process.env.PORT



console.log(process.env.DB_HOST);





app.use(express.json());
app.use(cookieParser());



app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
  })
);


app.use('/api', dataRoutes);



app.get("/", (req, res) => {
  res.send("Server is running i hope!!");

});



server.listen(PORTfavor, () => {
  console.log(`Server running on http://localhost:${PORTfavor}`);
});
