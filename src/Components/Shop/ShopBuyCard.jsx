import React, { useContext } from 'react'
import minting_section from '../../assets/minting_section.gif'
import AppButton from '../../common/AppButton'
import Web3 from "web3";
import {
  contractAddress1,
  contractabi1,
  contractAddress2,
  contractabi2,
  // tokenAddress, tokenabi
} from "../../constants/constants";
import { ActiveContext } from '../../App';


const ShopBuyCard = () => {

  const {
    address,
    walletvalue, supply, loadMyNFTs, loadNFTs, loadWeb3
  } = useContext(ActiveContext);

  const minttoken = async () => {
    //setshowbbuy(false)
    if (address !== 'Connect Wallet') {

      try {
        // console.log("accountDetails", referral);
        const web3 = window.web3;
        let ccontract = new web3.eth.Contract(contractabi2, contractAddress2);
        //let tokencontract = new web3.eth.Contract(tokenabi, tokenAddress);
        console.log("ll", contractAddress2)
        let price = await ccontract.methods.cost().call();
        console.log("mmm", price)



        let tokens = await ccontract.methods
          .createToken()
          .send({
            from: walletvalue,
            gasLimit: 3000000,
            value: price,
          })
          .on("transactionHash", async (hash) => {
            console.log("input", "Your transaction is pending");


          })
          .on("receipt", async (receipt) => {
            console.log("input", "Your transaction is confirmed", receipt);
            loadWeb3()
            //loadNFTs();
            //loadMyNFTs(walletvalue);
            //setshowconfirm(true);
            //setshowbuy(false);

          })
          .on("error", async (error) => {
            console.log("input", "User denied transaction", error);
          });
      } catch (e) {
        console.log("error", e);
        console.log("error", e.mesage);

      }
    }

  };

  return (
    <div className='shop__buy-card'>
      <div className='card__content'>
        <div className='card__heading'>
          Buy a Mystery Box
        </div>
        <div className='card__descrip'> <span className='descrip__price'>Price :</span> 0.1 BNB</div>
        <div className='card__descrip'> <span className='descrip__minted'>Mystery Box Minted :</span>  {supply}/2000</div>
        <AppButton title={address === 'Connect Wallet' ? `Connect your Wallet to Buy!` : `Buy Now`} onClick={minttoken} />
        {/* <button
          className="rounded-full bg-orange fw-bold   w-full"
          // onClick={connected ? buyTokens : walletconnect}
          onClick={minttoken}
          style={{ color: "black" }}
        >
          Buy
        </button> */}
      </div>
      <img src={minting_section} className='card__img' />

    </div>
  )
}

export default ShopBuyCard