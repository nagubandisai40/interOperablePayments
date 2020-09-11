const express = require("express");
const app = express();
const cors = require("cors");
const balance = require("./get_account_info");
const transfer = require("./test");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

app.get("/balance", (req, res) => {
  console.log("balance method is called", req.get("rippleId"));
  var rippleId = req.get("rippleId");
  balance
    .getBalance(rippleId)
    .then((response) => {
      console.log("---1---");
      console.log(response);
      console.log("---31---");
      res.json({ message: response });
    })
    .catch((err) => {
      console.log("---2---");
      console.log(err);
      res.send(err);
    });
});

app.post("/transfer", (req, res) => {
  var senderAddr = req.body["senderId"];
  var rcvrId = req.body["rcvrId"];
  var scrt = req.body["scrt"];
  var value = req.body["value"];
  transfer
    .transferTokens(senderAddr, rcvrId, scrt, value)
    .then((response) => {
      console.log("---3---");
      console.log(response);
      res.send(response);
    })
    .catch((err) => {
      console.log("---4---");
      console.log(err);
      res.send({ message: err });
    });
  // console.log("############################");
  // console.log(senderAddr, rcvrId, scrt, value);

  // console.log("############################");
  // res.send("Completed_Ripple");
});

app.listen(5000, () => {
  console.log("The app is listening on port 5000");
});
