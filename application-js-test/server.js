const express = require("express");
const app = express();
const registerUser = require("./registerUser");
const bodyParser = require("body-parser");
const helper = require("./app/helper");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const userValidations = require("./app/validations");
const cors = require("cors");
const axios = require("axios");
// const json = require("json");
app.use(bodyParser.json());

app.use(cors());

app.post("/registerUser", (req, res) => {
  console.log(req.body);
  registerUser
    .RegisterAppUser(
      req.body.userName,
      req.body.userPassword,
      req.body.rippleId
    )
    .then((aa) => {
      console.log(aa instanceof Error);
      if (aa instanceof Error) {
        throw aa;
      }
      res.status(200).json("Registration Success");
    })
    .catch((err) => {
      console.log("you caught error");
      res.status(400).json({ error: err });
    });
});

// This view is for getting the RippleId of the owner of the asset
app.get("/ownerRippleId", (req, res) => {
  var owner = req.get("owner");
  console.log(owner);
  var data = fs.readFileSync("./users/usersDetails.json");
  var users = JSON.parse(data);
  // console.log(users);
  console.log("Entering for loop");
  for (var i = 0; i < users.length; i++) {
    if (users[i]["name"] == owner) {
      res.status(200).json({ rippleId: users[i]["rippleId"] });
      return;
    }
  }
  res.status(400).json({ message: "User Not Found" });
});

app.post("/test_view", (req, res) => {
  var id = req.body["rippleId"];
  axios
    .get("http://localhost:5000/balance", { headers: { rippleId: id } })
    .then((response) => {
      console.log(response);
      res.send(response["data"]);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/balanceTransfer", (req, res) => {
  var senderId = req.body["senderId"];
  var rcvrId = req.body["rcvrId"];
  var secret = req.body["scrt"];
  var value = req.body["value"];
  var userName = req.body["userName"];
  var id = req.body["id"];
  var owner = req.body["owner"];
  axios
    .post("http://localhost:5000/transfer", {
      senderId: senderId,
      rcvrId: rcvrId,
      scrt: secret,
      value: value,
    })
    .then((response) => {
      // console.log(response);
      // console.log(JSON.parse(response));
      const { Account, Amount, Destination, hash } = response.data.tx_json;
      // console.log();
      // console.log(Account);
      // console.log(Amount);
      // console.log(Destination);
      // console.log(hash);
      helper
        .transferAsset(userName, id, owner, Account, Amount, Destination, hash)
        .then((value) => {
          console.log(value);
          res.status(200).json(value);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
      // res.status(200).send(response["data"]);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

function getErrorMessage(field) {
  var response = {
    success: false,
    message: field + " field is missing or Invalid in the request",
  };
  return response;
}

app.post("/login", (req, res) => {
  var username = req.body.userName;
  var orgName = req.body.orgName;
  var userPassword = req.body.userPassword;

  if (!username) {
    res.status(401).json(getErrorMessage("'username'"));
    return;
  }
  if (!orgName) {
    res.status(401).json(getErrorMessage("'orgName'"));
    return;
  }

  helper
    .isUserRegistered(username, orgName, userPassword)
    .then((ss) => {
      console.log(ss);
      if (ss["isUserCrct"]) {
        const token = jwt.sign(
          {
            userName: username,
          },
          "SECRETKEY",
          { expiresIn: "120m" }
        );

        res.status(200).json({
          success: true,
          message: {
            token: token,
            userName: username,
            rippleId: ss["rippleId"],
          },
        });
      } else {
        throw new Error("UserName or password is incorrect");
        // res.json({ success: false, message: `User with username ${username} is not registered with ${orgName}, Please register first.` });
      }
    })
    .catch((err) => {
      console.log("You caught error");
      res.status(401).json(err);
    });
});

app.get("/allAssets", userValidations.isLoggedIn, (req, res) => {
  console.log("GetAll Assets is called");
  console.log(req.get("userName"));
  helper
    .getAllAssets(req.get("userName"))
    .then((value) => {
      console.log(value);
      res.json({ message: value });
    })
    .catch((error) => {
      console.log("You caught error");
      res.json({
        message: error,
      });
    });
  // return res.json("Hie from getAllAssets Method")
  // helper.getAllAssets(req)
});

app.get("/assetByCat", userValidations.isLoggedIn, (req, res) => {
  console.log("GetAssetBy cat method is called");
  console.log(req.get("userName"));
  console.log(req.get("catName"));
  helper
    .getAssetByCat(req.get("userName"), req.get("catName"))
    .then((value) => {
      console.log("The response is ", value);
      res.json({ message: value });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error: error });
    });
});

app.post("/createAsset", userValidations.isLoggedIn, (req, res) => {
  var id = req.body.id;
  var issueId = req.body.issueId;
  var issueName = req.body.issueName;
  var owner = req.body.owner;
  var value = req.body.value;
  var cat = req.body.cat;
  var userName = req.body.userName;
  var assetName = req.body.assetName;

  helper
    .createAsset(userName, id, issueId, issueName, owner, value, cat, assetName)
    .then((value) => {
      console.log(value);
      res.json(value);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// app.post("/transferAsset", userValidations.isLoggedIn, (req, res) => {
//   var id = req.body.id;
//   var owner = req.body.owner;
//   var userName = req.body.userName;
//   var senderAddr = req.body.senderAddr;
//   var rcvrAddr = req.body.rcvrAddr;
//   var scrt = req.body.scrt;
//   var val = req.body.value;
//   console.log("DEBUG_START:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
//   console.log({
//     senderId: senderAddr,
//     rcvrId: rcvrAddr,
//     scrt: scrt,
//     value: val,
//   });
//   console.log("DEBUG_END:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
//   res.send("Completed-----------------XXXXX");
//   axios
//     .post("http://localhost:5000/transfer", {
//       senderId: senderAddr,
//       rcvrId: rcvrAddr,
//       scrt: scrt,
//       value: val,
//     })
//     .then((response) => {
//       console.log(response);
//       res.status(200).send(response["data"]);
//       helper.transferAsset(userName,id,owner).then(value=>{
//           console.log(value);
//           res.status(200).json(value);
//       }).catch(err=>{
//           console.log(err)
//           res.status(400).json(err);
//       })
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).send(err);
//     });
// });

app.listen(3000, () => {
  console.log("Listening in port 3000");
});
