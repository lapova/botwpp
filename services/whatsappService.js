const https = require("https");
function sendMessageWhatsApp(data){

    const options = {
        host: "graph.facebook.com",
        path: "/v16.0/102518096156790/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAAXNJ5LMWGwBAImmTKNuX7jnIhMCNlnbiNYAUnYeqNZBXuz2PZBIXkCRZAGb94UlTTjokWZBtqg3gyVgO0dQc4tCJBZAZB6GtEWpBK0B8ZAKmBHARrSpvR0y7C1ZCgSmVqN2QyX1qaTLZCVckiW0A6XXKfHuMrXbxbot16XmooWZCydLP2I4Tn8ZAhW"
        }
    };

    const req = https.request(options, res => {
        res.on("data", d => {
            process.stdout.write(d);
        });
    });

    req.on("error", error => {
        console.error(err);
    });

    req.write(data);
    req.end();
}

module.exports = {
    sendMessageWhatsApp
};