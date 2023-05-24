import { Injectable } from '@nestjs/common';
import { Contract, ethers } from 'ethers';
import * as tokenJson from "./assets/MyERC20Votes.json"
import { ConfigService } from '@nestjs/config';
import { error } from 'console';

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider;
  contract: Contract;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('ALCHEMY_API_KEY');
    // const apiKey = this.configService.get<string>('INFURA_API_KEY');
    this.provider = new ethers.providers.AlchemyProvider('goerli', apiKey);
    // this.provider = new ethers.providers.InfuraProvider('sepolia', apiKey);
    // this.provider = ethers.getDefaultProvider('goerli');
    // this.provider = ethers.getDefaultProvider('sepolia');
    this.contract = new Contract(this.getAddress(), tokenJson.abi, this.provider);
  }

  getHello(): string {
    return 'Hello World!';
  }

  getLastBlock() { //: Promise<ethers.providers.Block> {
    //const provider = ethers.getDefaultProvider("goerli");
    return this.provider.getBlock("latest");
  }

  getAddress() {
    const tokenAddress = this.configService.get<string>('TOKEN_ADDRESS');
    return tokenAddress;
  }
  
  getTotalSupply() {
    // const contract = new Contract(this.getAddress(), tokenJson.abi, this.provider);
    return this.contract.totalSupply();
  }

  getBalanceOf(address: string) {
    return this.contract.balanceOf(address);
  }

  async getTransactionReceipt(hash: string) {
    const tx = await this.provider.getTransaction(hash);
    const receipt = await this.getReceipt(tx);
    return receipt;
  }

  async getReceipt(tx: ethers.providers.TransactionResponse) {
    return await tx.wait();
  }

  async requestTokens(address: string, signature: string) {
    // if(ethers.utils.verifyMessage("haha", signature) != address) throw error;
    const pKey = this.configService.get<string>('PRIVAET_KEY');
    const wallet = new ethers.Wallet(pKey);
    const signer = wallet.connect(this.provider);
    return this.contract.connect(signer).mint(address, ethers.utils.parseUnits("1"));
  }
}