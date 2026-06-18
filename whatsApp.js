//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Package
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Health Check Endpoint
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get("/", (req, res) => {
  let resData = {
    status: true,
    message: "WhatsApp Business API Node.js Server is running.",
  };
  return res.status(200).json(resData);
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Send WhatsApp Message Endpoint
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get("/sendMessage", (req, res) => {
  console.log("sendMessage API endpoint triggered");
  let resData = {
    status: false,
    answare: "",
  };

  try {
    // Determine Token (handles both raw token or 'Bearer <token>')
    let token = process.env.WHATSAPP_TOKEN || process.env.SECRET_KEY || "";
    if (token.startsWith("Bearer ")) {
      token = token.replace("Bearer ", "").trim();
    }

    const phoneNumberId = process.env.PHONE_NUMBER_ID || "893818507150447";
    const apiVersion = process.env.API_VERSION || "v22.0";
    const recipient = process.env.TO || "+8801310861071";
    const templateName = process.env.TEMPLATE_NAME || "hello_world";
    const languageCode = process.env.TEMPLATE_LANG || "en_US";

    const options = {
      method: "POST",
      url: `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: {
        messaging_product: "whatsapp",
        to: recipient,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: languageCode,
          },
        },
      },
      json: true,
    };

    request(options, function (error, response, body) {
      if (error) {
        console.error("WhatsApp API Request Error:", error);
        resData.status = false;
        resData.answare = error.message || error;
        return res.status(500).json(resData);
      }

      console.log("Meta API Response Body:", body);
      resData.status = response.statusCode >= 200 && response.statusCode < 300;
      resData.respondData = body;

      return res.status(response.statusCode).json(resData);
    });
  } catch (e) {
    console.error("Internal Server Error:", e);
    resData.status = false;
    resData.answare = e.message || e;
    return res.status(500).json(resData);
  }
});

//+++++++++++++++++++++++++++++++++++++++++++++++++
// Server Listen
//+++++++++++++++++++++++++++++++++++++++++++++++++
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`WhatsApp API Server running on http://localhost:${PORT}`);
});

