// exporting from a bs58 private key to an Uint8Array
// == from phantom private key to solana cli id.json key file
// npm install bs58 @solana/web3.js
// to 58
const web3 = require("@solana/web3.js");
const bs58 = require('bs58');
let secretKey = bs58.decode("3pSFregQiKYGakhcjRMEjdojiLreb9BVr96oQN6LKuPWtC17TxmCidf9eEtxnmxrZmgE8NdsQVA7B9YF3snrmbLT");
console.log(`[${web3.Keypair.fromSecretKey(secretKey).secretKey}]`);

// from 58

// exporting back from Uint8Array to bs58 private key
// == from solana cli id.json key file to phantom private key

// const bs58 = require('bs58');
// privkey = new Uint8Array([111, 43, 24, ...]); // content of id.json here
// console.log(bs58.encode(privkey));