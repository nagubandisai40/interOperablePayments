var { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const FabricCAServices = require("fabric-ca-client");
const fs = require("fs");
const bcrypt = require("bcrypt");

const getWalletPath = async (org) => {
  let walletPath;
  if (org == "org1") {
    walletPath = path.join(process.cwd(), "./wallet");
  } else if (org == "org2") {
    walletPath = path.join(process.cwd(), "./wallet");
  } else if (org == "org3") {
    walletPath = path.join(process.cwd(), "./wallet");
  } else {
    return null;
  }

  return walletPath;
};

async function isUserRegistered(username, userOrg, userPassword) {
  const walletPath = await getWalletPath(userOrg);
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  console.log(`Wallet path: ${walletPath}`);

  const userIdentity = await wallet.get(username);

  var rippleId = "";

  var sss = { isUserCrct: false, rippleId: "" };

  if (userIdentity) {
    var da = fs.readFileSync("./users/usersDetails.json");
    var data = JSON.parse(da);
    var isUserCrct = false;
    for (var x of data) {
      // console.log(x['name']);
      if (x["name"] == username) {
        // console.log("Name is equal")
        isUserCrct = bcrypt.compareSync(userPassword, x["password"]);
        if (isUserCrct) {
          rippleId = x["rippleId"];
          console.log("The rippleId is " + rippleId);
        }
      }
    }

    sss = { isUserCrct: isUserCrct, rippleId: rippleId };
    return sss;
  }
  return sss;
}

async function getAllAssets(userName) {
  try {
    // load the network configuration
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "test-network1",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(userName);
    if (!identity) {
      console.log(
        'An identity for the user "appUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: userName,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("mycc");

    // Evaluate the specified transaction.
    // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
    // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
    const result = await contract.evaluateTransaction("GetAllAssets");
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );

    // Disconnect from the gateway.
    await gateway.disconnect();

    return result.toString();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    return error;
  }
}

async function getAssetByCat(userName, catName) {
  try {
    // load the network configuration

    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "test-network1",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(userName);
    if (!identity) {
      console.log(
        'An identity for the user "appUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: userName,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("mycc");

    // Evaluate the specified transaction.
    // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
    // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
    const result = await contract.evaluateTransaction("GetAssetByCat", [
      catName,
    ]);
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );

    // Disconnect from the gateway.
    await gateway.disconnect();

    return result.toString();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    return error;
  }
}

async function createAsset(
  userName,
  id,
  issuerId,
  issueName,
  owner,
  value,
  cat,
  assetName
) {
  try {
    // load the network configuration

    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "test-network1",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(userName);
    if (!identity) {
      console.log(
        'An identity for the user "appUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: userName,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("mycc");

    // Evaluate the specified transaction.
    // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
    // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
    const result = await contract.submitTransaction(
      "CreateAsset",
      id,
      issuerId,
      issueName,
      owner,
      value,
      cat,
      assetName
    );
    // console.log(`Transaction has been evaluated, result is: ${result}`);

    // Disconnect from the gateway.
    await gateway.disconnect();

    return result.toString();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    return error;
  }
}

async function transferAsset(
  userName,
  id,
  owner,
  Account,
  Amount,
  Destination,
  hash
) {
  try {
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "test-network1",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const identity = await wallet.get(userName);
    if (!identity) {
      console.log(
        'An identity for the user "appUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: userName,
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = network.getContract("mycc");

    const result = await contract.submitTransaction(
      "TransferAsset",
      id,
      owner,
      Amount,
      Account,
      Destination,
      hash
    );

    await gateway.disconnect();

    return result.toString();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    return error;
  }
}

module.exports = {
  isUserRegistered: isUserRegistered,
  getAllAssets: getAllAssets,
  getAssetByCat: getAssetByCat,
  createAsset: createAsset,
  transferAsset: transferAsset,
};
