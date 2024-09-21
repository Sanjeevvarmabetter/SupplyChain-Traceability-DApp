import { ethers } from "ethers";
import abi from "./contractJson/SupplyChain.json"

const contractAddress = "0xF5633334919253c91b0E5363Ca46Ce1B3EF557f1";
const contractABI = abi.abi;


export const getContract = async () => {
    const { etherem } = window;
    if(!etherem) throw new Error("Ethereum obj do not exists");

    const provider =  new ethers.provider.Web3Provider(etherem);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress,contractABI,signer);

};