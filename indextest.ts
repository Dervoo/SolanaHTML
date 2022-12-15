import {getAccount, createMint, createAccount, mintTo, getOrCreateAssociatedTokenAccount, transfer} from "@solana/spl-token";
import {clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { Wallet } from "@project-serum/anchor";

(async () => {

  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  // const wallet = Keypair.generate();
  const auxiliaryKeypair = Keypair.generate();
  console.log("auxi wallet generated: ", auxiliaryKeypair)

  const secretKey = "[140,240,198,127,47,73,167,84,83,30,165,145,248,92,199,219,89,0,176,21,43,140,230,178,71,58,135,175,72,99,234,70,144,101,4,150,179,194,54,18,240,103,220,96,106,128,41,224,76,118,78,23,64,226,74,42,210,27,208,112,72,146,224,192]"
    const keypair = anchor.web3.Keypair.fromSecretKey(
      Buffer.from(JSON.parse(secretKey))
    );
    const wallet = new Wallet(keypair);

  // const airdropSignature = await connection.requestAirdrop(
  //   wallet.publicKey,
  //   LAMPORTS_PER_SOL,
  // );

  // await connection.confirmTransaction(airdropSignature);

  const mint = await createMint(
    connection,
    keypair,
    wallet.publicKey,
    wallet.publicKey,
    9
  );

  console.log("mint: ", mint)

  // Create custom token account
  const auxiliaryTokenAccount = await createAccount(
    connection,
    keypair,
    mint,
    wallet.publicKey,
    auxiliaryKeypair
  );

  console.log("auxuTokenAcc: ", auxiliaryTokenAccount)

  const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    wallet.publicKey
  );

  console.log("associatedTokenAcc: ", associatedTokenAccount)

  await mintTo(
    connection,
    keypair,
    mint,
    associatedTokenAccount.address,
    keypair,
    50
  );
  
  const accountInfo = await getAccount(connection, associatedTokenAccount.address);

  console.log(accountInfo.amount);
  // 50

  await transfer(
    connection,
    keypair,
    associatedTokenAccount.address,
    auxiliaryTokenAccount,
    keypair,
    50
  );

  const auxAccountInfo = await getAccount(connection, auxiliaryTokenAccount);

  console.log(auxAccountInfo.amount);
  // 50
})();