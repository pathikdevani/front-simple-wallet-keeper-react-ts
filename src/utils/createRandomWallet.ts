import { ethers } from "ethers";

export default function createRandomWallet(): ethers.Wallet{
    return ethers.Wallet.createRandom();
}
