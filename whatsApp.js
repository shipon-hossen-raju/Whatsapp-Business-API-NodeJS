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
app.get("/", (req, res) => {
  let resData = {
    status: false,
    answare: "",
  };
  resData.status = true;
  resData.message =
    "Hello Every One Form From Code 180. This API is working......";
  return res.status(200).json(resData);
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get("/sendMessage", (req, res) => {
  console.log("sendMessage called");
  let resData = {
    status: false,
    answare: "",
  };
  try {
    const options = {
      method: "POST",
      url: "https://graph.facebook.com/v22.0/893818507150447/messages",
      headers: {
        Authorization: `Bearer EAAQnIyphkEkBQBIGB9sZCUZAtch3HYTnnLtsT9aEZC9AAVs1J6u5JUovpuZCzVpfyOQzxNAhjMYYS6bZAWzl9Lt3F2HgEbhYesLglMbVAhAqZCKrvRH9qdXdkumV289zmCrNXA2OLBb0eroq9P4HBrdqP4ZCszpV5NJ3sgFNfyWN9QZBvWm0ZCiAwveAyM4Y6UvYxJ0z8nNDZBmm2h1OrkusGNBCGgxzUBdrUcaDPv8zo74ZBiuZASbrT8p72AMhGU8eyjVqJ4LP2OcQQdFUmSkKjoTE`,
        "Content-Type": "application/json",
      },
      body: {
        messaging_product: "whatsapp",
        to: "+8801310861071",
        type: "template",
        template: {
          name: "hello_world",
          language: {
            code: "en_US",
          },
        },
      },
      json: true,
    };
    request(options, function (error, response, body) {
      console.log("error ", error);
      if (error) throw new Error(error);
      //+++++++++++++++++++++++++++++++++++++++++++++
      resData.status = true;
      resData.respondData = body;

      console.log("resData ", resData);
      return res.status(200).json(resData);
    });
  } catch (e) {
    resData.status = false;
    resData.answare = e;
    return res.status(200).json(resData);
  }
});
//+++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(3000, () => {
  console.log("starting...");
});
