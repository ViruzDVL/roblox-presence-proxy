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

        // AMBIL DATA ASLI DARI ROBLOX (Menggunakan Fetch API bawaan Node.js)
        const robloxResponse = await fetch("https://roblox.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ userIds: userIds })
        });

        if (!robloxResponse.ok) {
            const errorText = await robloxResponse.text();
            return res.status(robloxResponse.status).json({
                error: `Roblox API Error: ${errorText}`
            });
        }

        const data = await robloxResponse.json();

        // Mengembalikan data pelacakan asli dari Roblox ke pengguna API Anda
        return res.status(200).json({
            userPresences: data.userPresences
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
