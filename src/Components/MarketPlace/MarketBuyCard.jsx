import React, { useEffect } from 'react'
import AppButton from '../../common/AppButton'
import Web3 from "web3";
import {
  contractAddress1,
  contractabi1,
  contractAddress2,
  contractabi2,
  // tokenAddress, tokenabi
} from "../../constants/constants";


const MarketBuyCard = ({ data, walletvalue, loadWeb3, loadNFTs }) => {

  const buytoken = async () => {
    //setshowbbuy(false)

    try {
      // console.log("accountDetails", referral);
      const web3 = window.web3;
      let ccontract = new web3.eth.Contract(contractabi2, contractAddress2);
      //let tokencontract = new web3.eth.Contract(tokenabi, tokenAddress);
      console.log("ll", contractAddress2)



      let tokens = await ccontract.methods
        .createMarketSale(data.itemId)
        .send({
          from: walletvalue,
          gasLimit: 200000,
          value: data.price
        })
        .on("transactionHash", async (hash) => {
          console.log("input", "Your transaction is pending");


        })
        .on("receipt", async (receipt) => {
          console.log("input", "Your transaction is confirmed", receipt);
          loadWeb3()
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
  };


  return (
    <div className='shop__chance-card'>
      <div className='card__content'>
        <div className='content__left'>Token Id</div>
        <div className='content__right'>{1652019+"100"}</div>

      </div>
      {/* <img src={data.nft} className='card__nft' /> */}
      <div dangerouslySetInnerHTML={{
        __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          src="${data.image}"
          class="card__nft"
        />,
      ` }}></div>
      <div className='card__content'>
        <div className='content__left'>{data.name}</div>
        <div className='content__right'>{data.times}</div>

      </div>
      <div className='card__content'>
        <div className='content__left'>Rarity</div>
        <div className='content__right'>{data.rarity.charAt(0).toUpperCase() + data.rarity.slice(1).toLowerCase()}</div>

      </div>


      <div className='card__content'>
        <div className='content__left'>Selling Price</div>
        <div className='content__right'>{data.pricee}BNB</div>

      </div>
      {/* <button
                      className="rounded-full bg-orange fw-bold   w-full"
                      // onClick={connected ? buyTokens : walletconnect}
                      onClick= {  buytoken  }
                      style={{ color: "black" }}
                    >
                      Buy
                    </button> */}

      <AppButton title='Buy' onClick={buytoken} />


    </div>
  )
}

export default MarketBuyCard