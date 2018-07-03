const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytreact");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
