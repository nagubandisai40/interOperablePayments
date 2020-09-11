async function transferTokens(senderAddr, rcvrAddr, secrete, value) {
  const RippleAPI = require("ripple-lib").RippleAPI;
  // TESTNET ADDRESS 1
  const ADDRESS_1 = senderAddr;
  const SECRET_1 = secrete;
  // TESTNET ADDRESS 2
  const ADDRESS_2 = rcvrAddr;
  const instructions = { maxLedgerVersionOffset: 5 };
  const currency = "XRP";
  const amount = value;
  const payment = {
    source: {
      address: ADDRESS_1,
      maxAmount: {
        value: amount,
        currency: currency,
      },
    },
    destination: {
      address: ADDRESS_2,
      amount: {
        value: amount,
        currency: currency,
      },
    },
  };
  var mm;
  const api = new RippleAPI({
    server: "wss://s.altnet.rippletest.net:51233", // TESTNET
  });
  await api
    .connect()
    .then(async () => {
      console.log("Connected...");
      await api
        .preparePayment(ADDRESS_1, payment, instructions)
        .then(async (prepared) => {
          const { signedTransaction, id } = api.sign(prepared.txJSON, SECRET_1);
          console.log(id);
          await api.submit(signedTransaction).then(async (result) => {
            console.log(JSON.stringify(result, null, 2));
            mm = JSON.stringify(result, null, 2);
            api.disconnect();
          });
        });
    })
    .catch(console.error);
    
  console.log("############################");
    console.log(mm);

  console.log("############################");
    return mm;
}

module.exports = {
  transferTokens: transferTokens,
};
