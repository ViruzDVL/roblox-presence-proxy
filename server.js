const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.json({
        status: "online",
        message: "Roblox Presence Proxy Running"
    });
});

module.exports = app;
