const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Roblox Presence Proxy Running"
    });
});

app.post("/presence", async (req, res) => {
    try {
        const { userIds } = req.body;

        if (!userIds || !Array.isArray(userIds)) {
            return res.status(400).json({
                error: "userIds array required"
            });
        }

        return res.status(200).json({
            userPresences: userIds.map(id => ({
                userId: id,
                userPresenceType: 0
            }))
        });

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

module.exports = app;

if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
