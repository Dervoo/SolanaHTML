const { Metadata } = require('@metaplex-foundation/mpl-token-metadata');
const { Connection} = require('@metaplex/js');
const axios = require('axios');
const metaplexConnection = new Connection('mainnet-beta');
import {AccountLayout, TOKEN_PROGRAM_ID} from "@solana/spl-token";
// import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";

//@pubkey: string is NFT mint address
async function getMetadata(mintAddress){
    const tokenMetaPublicKey=await Metadata.getPDA(mintAddress)
    const response=await Metadata.load(metaplexConnection, tokenMetaPublicKey)
    console.log(response)
    const { data } = await axios.get(response.data.data.uri);
    console.log(data)
    return
}
getMetadata('EVNxRMQH5wZScNEhV4qM5VmNQ6WnzfjJBk7m4K5qXhTk'); //replace with any NFT mint address