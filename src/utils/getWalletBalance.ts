import { ethers } from "ethers";
const network = "rinkeby";
const provider = ethers.getDefaultProvider(network);

export default async function getWalletBalance(address: string) {
  const balance = await provider.getBalance(address);
  const balanceInEth = ethers.utils.formatEther(balance);
  return balanceInEth;
}
