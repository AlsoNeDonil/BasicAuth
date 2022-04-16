const express = require("express");
const authRouter = require("./authRouter");
const db = require('./db');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

const start = () => {
    try{
        db.authenticate();
        db.sync();
        app.listen(PORT, () => console.log("Server has been started PORT =", PORT))

    } catch(e){
        console.log(e);
    }
}

start();