import React, { useState } from 'react'
import AppButton from '../../common/AppButton'
import {
  contractAddress1,
  contractabi1,
  contractAddress2,
  contractabi2,
  // tokenAddress, tokenabi
} from "../../constants/constants";
import BuyTransferModal from '../BuyTransferModal';
import SellTransferModal from '../SellTransferModal';
import Web3 from "web3";




const InventoryCard = ({ data, walletvalue, loadWeb3 }) => {
  const [bnbvalue, setbnbValue] = useState();
  const [showsell, setshowsell] = useState(false);
  const [showadd, setshowadd] = useState(false);
  const [addressvalue, setaddressValue] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  const sellinputbnb = async (e) => {
    try {
      const web3 = window.web3;
      // console.log("bscAddress true", typeof e.target.value);
      // console.log("bscAddress true", e.target.value === "");
      // console.log("bscAddress", window.web3.utils.toWei(e.target.value))
      setbnbValue(web3.utils.toWei(e.target.value));
      console.log("mmm", bnbvalue);
      console.log("nn", walletvalue)
    } catch (e) {
      console.log("error", e);
    }
  };

  const inputaddress = async (e) => {
    try {
      const web3 = window.web3;
      // console.log("bscAddress true", typeof e.target.value);
      // console.log("bscAddress true", e.target.value === "");
      // console.log("bscAddress", window.web3.utils.toWei(e.target.value))
      setaddressValue(e.target.value);
      console.log("mmm", addressvalue);
      //console.log("nn",walletvalue)
    } catch (e) {
      console.log("error", e);
    }
  };

  const sell = async () => {
    setshowsell(false)
    try {
      const web3 = window.web3;
      let contract = new web3.eth.Contract(contractabi2, contractAddress2);
      console.log("mmmmm", data.itemId, contractAddress2, data.price)
      let accountDetails = await contract.methods
        .resellToken(data.itemId, bnbvalue)
        .send({
          from: walletvalue,
          gasLimit: 3000000,
        })
        .on("transactionHash", async (hash) => {
          console.log("Your transaction is pending");
        })
        .on("receipt", async (receipt) => {
          console.log("Your transaction is confirmed", receipt);
          //toast.success("Your transaction is confirmed");
          loadWeb3()

        })
        .on("error", async (error) => {
          console.log("User denied transaction", error);
        });
    } catch (e) {
      console.log("error", e);
    }
    setIsOpen(false);

  };

  const transfer = async () => {
    setshowsell(false)
    try {
      const web3 = window.web3;
      let contract = new web3.eth.Contract(contractabi2, contractAddress2);
      console.log("mmmmm", data.itemId, contractAddress2, data.price)
      let accountDetails = await contract.methods
        .transferToken(data.itemId, addressvalue)
        .send({
          from: walletvalue,
          gasLimit: 3000000,
        })
        .on("transactionHash", async (hash) => {
          console.log("Your transaction is pending");
        })
        .on("receipt", async (receipt) => {
          console.log("Your transaction is confirmed", receipt);
          //toast.success("Your transaction is confirmed");
          loadWeb3()

        })
        .on("error", async (error) => {
          console.log("User denied transaction", error);
        });
    } catch (e) {
      console.log("error", e);
    }
    setIsTransferOpen(false);

  };
  const toggle = () => {
    setIsOpen(!isOpen);

  }
  const toggleTransfer = () => {
    setIsTransferOpen(!isTransferOpen);

  }
  console.log(isTransferOpen);



  return (
    <>

      <div className='inventory__card'>
        <div className='card__content'>
          <div className='content__left'>Token Id</div>
          <div className='content__right'>{16520190+data.itemIdd}</div>

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
          <div className='content__right'>{data.rarity}</div>
        </div>


        <div className='card__actions'>
          <div className='actions--transfer' onClick={toggleTransfer}>transfer</div>
          <div className='actions--staking'>staking</div>
          <div className='actions--sell' onClick={toggle}>sell</div>


        </div>

        {/* <div className='card__actions'>
            
                
               
                <div className='actions--staking'>staking</div>
                <div className='actions--sell'>
                
                <AppButton  title="Sell" onClick={() =>  setshowadd(true) } /><br/>
                {showadd?  <div className="text-lg mb-8">
                    <input
                      type="text"
                     
                      placeholder="price"
                      onChange={inputaddress}
                      style={{ color: "white" }}
                    />
                  </div>:null} <br/>
                  
                    {showadd?  <button
                     
                      // onClick={connected ? buyTokens : walletconnect}
                      onClick= {  transfer  }
                      style={{ color: "black" }}
                    >
                      confirm
                    </button>:null}
                </div>
            </div> */}
      </div>
      <BuyTransferModal
        buttonTitle="Transfer"
        onChange={inputaddress}
        setIsOpen={setIsTransferOpen}
        isOpen={isTransferOpen}
        onClick={transfer}
        toggle={toggleTransfer}
      />
      <SellTransferModal
        buttonTitle="Sell"
        onChange={sellinputbnb}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        onClick={sell}
        toggle={toggle}

      />
    </>

  )
}

export default InventoryCard