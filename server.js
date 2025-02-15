const express = require("express"); 
const axios = require("axios"); 
const cors = require("cors"); 

const app = express(); // Define app before using it

app.use(cors());
app.use(express.json());

// Homepage Route
app.get("/", (req, res) => {
    res.send("Website Down Detector API is running! Use /check?url=YOUR_URL");
});

// Website Status Check Route
app.get("/check", async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.json({ error: "⚠️ Please provide a valid website URL to check its status." });
    }

    try {
        const response = await axios.get(url, { timeout: 5000 });
        res.json({ 
            status: "✅ UP", 
            message: `🎉 Great news! The website (${url}) is currently UP and running smoothly!`, 
            statusCode: response.status 
        });
    } catch (error) {
        console.error("Error checking website status:", error.message); 

        if (error.response) {
            res.json({ 
                status: "❌ DOWN", 
                message: `⚠️ Uh-oh! The website (${url}) is DOWN! (Status Code: ${error.response.status})` 
            });
        } else if (error.code === "ECONNABORTED") {
            res.json({ 
                status: "⏳ TIMEOUT", 
                message: `⌛ The website (${url}) is taking too long to respond! It may be slow or temporarily unreachable.` 
            });
        } else {
            res.json({ 
                status: "🚫 UNREACHABLE", 
                message: `⚠️ Oops! We couldn't reach (${url}). Please check if the URL is correct or if the website is down.` 
            });
        }
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

