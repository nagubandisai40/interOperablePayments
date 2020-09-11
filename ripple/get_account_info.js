'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net:51233'
});


async function getBalance(rippleId) {
  console.log("*********************")
  console.log(rippleId)

  console.log("*********************")
  var mm;

  await api.connect().then(() => {
    const myAddress = rippleId;
    console.log('getting account info for', myAddress);
    return api.getAccountInfo(myAddress);
  }).then(info => {
    console.log(info);
    console.log('getAccountInfo done');
    mm=info;
    /* end custom code -------------------------------------- */
  }).then(() => {
    return api.disconnect();
  }).then(() => {
    console.log('done and disconnected.');
    
  // console.log("*********#####************")
  // console.log(mm)

  //   console.log("********#####*************")
  }).catch(console.error);
  console.log("returning MM from get_account_info ", mm)

  return mm;
  
}


module.exports={
  getBalance:getBalance
}