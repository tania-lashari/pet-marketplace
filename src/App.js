import { createContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import "./styles/styles.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import WalletConnectProvider from "@walletconnect/web3-provider";

import Web3 from "web3";
import axios from "axios";
import {
  contractAddress1,
  contractabi1,
  contractAddress2,
  contractabi2,
  // tokenAddress, tokenabi
} from "./constants/constants";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./Components/Layout";
import HomePage from './Pages/HomePage'
import ShopPage from "./Pages/ShopPage";
import InventryPage from "./Pages/InventryPage";
import MarketplacePage from "./Pages/MarketplacePage";


export const ActiveContext = createContext();

const App = () => {
  const [active, setActive] = useState(1);
  const [value, setValue] = useState(20);
  const [nftprice, nftsetprice] = useState([]);
  const [nftitems, nftsetitems] = useState([]);
  const [mnftprice, mnftsetprice] = useState([]);
  const [mnftitems, mnftsetitems] = useState([]);
  const [nfts, setNfts] = useState([])
  const [mynfts, setMyNfts] = useState([])
  const [listednfts, setListedNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [walletvalue, setWalletValue] = useState(".......");
  const [balance, setBalance] = useState("token");
  const [ticket, setticketBalance] = useState("nft");
  const [inputval, setInputVal] = useState();
  var [fff, setfff] = useState([]);
  var [nnn, setnnn] = useState([]);
  const [account, setAccount] = useState("Metamask");
  const [Connect, setConnect] = useState("WalletConnect");
  const [connected, setconnected] = useState(false);
  const [connectWallet, setConnectWallet] = useState("WalletConnect");
  const [show, setShow] = useState(false);
  const [showmeta, setShowMeta] = useState(false);
  const [showwallet, setShowWallet] = useState(false);
  const [hi, sethin] = useState(false);
  const [supply, setsupply] = useState([]);
  const [address, setaddress] = useState("Connect Wallet");

  let addresvalue;

  let accountAd;
  let item;

  const loadWeb3 = async () => {
    setShowMeta(true);
    setShow(false);
    setShowWallet(false);
    let isConnected = false;
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        isConnected = true;
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        isConnected = true;
      } else {
        isConnected = false;
        setconnected(false);
        console.log(
          "Metamask is not installed, please install it on your browser to connect."
        );
        alert(
          "Metamask is not installed, please install it on your browser to connect."
        );
      }
      if (isConnected === true) {
        let accounts = await getAccounts();
        setAccount(accounts[0]);
        accountAd = accounts[0];
        setConnect("Connected");
        setWalletValue(accounts[0]);
        addresvalue = accountAd.substring(0, accountAd.length - 31) + "...";

        setaddress(addresvalue);
        getData();
        loadNFTs();
        loadMyNFTs()
        loadListedNFTs();

        setconnected(true);
        // getMasterData();

        let accountDetails = null;
        window.ethereum.on("accountsChanged", function (accounts) {
          setAccount(accounts[0]);
          accountAd = accounts[0];
          setConnect("Connected");
          setWalletValue(accounts[0]);
          addresvalue = accountAd.substring(0, accountAd.length - 31) + "...";

          setaddress(addresvalue);
          // console.log(accounts);
        });
      }
    } catch (error) {
      console.log("Error while connecting metamask", error);
      // alert("Error while connecting metamask");
    }
  };

  const getAccounts = async () => {
    const web3 = window.web3;
    try {
      let accounts = await web3.eth.getAccounts();
      console.log(accounts);
      return accounts;
    } catch (error) {
      console.log("Error while fetching acounts: ", error);
      return null;
    }
  };

  // eslint-disable-next-line
  const isLockedAccount = async () => {
    try {
      let accounts = await getAccounts();
      if (accounts.length > 0) {
        console.log("Metamask is unlocked");
      } else {
        console.log("Metamask is locked");
      }
    } catch (error) {
      alert("Error while checking locked account");
    }
  };

  const walletconnect = async () => {
    setShowWallet(true);
    let isConnected = false;
    try {
      // setErrorState(false);
      console.log("This is   setErrorState(false);");
      // const provider = new WalletConnectProvider({
      //     infuraId: "6d2b77cc1e1d45a7a12b25035aa39ce2",
      // });

      const provider = new WalletConnectProvider({
        chainId: 56,
        rpc: {
          56: "https://bsc-dataseed.binance.org",
        },
      });

      //  Enable session (triggers QR Code modal)
      await provider.enable();

      if (provider) {
        window.web3 = new Web3(provider);
        isConnected = true;
      } else {
        isConnected = false;
        setconnected(false);
        // setErrorState(true);
        console.log("This is setErrorState(true)");
        // let options = {};
        // options = {
        //   place: "tr",
        //   message: "wallet connect is not connected",
        //   type: "primary",
        //   icon: "",
        //   autoDismiss: 7,
        // };
        // notificationAlertRef.current.notificationAlert(options);
        // // "Metamask is not installed, please install it on your browser to connect.",
      }
      if (isConnected === true) {
        setconnected(true);
        const web3 = window.web3;
        let accounts = await web3.eth.getAccounts();
        web3.eth.net.getId().then((netId) => {
          // console.log("(accounts[0], 2)", (accounts))
          setWalletValue(accounts[0]); 
          setAccount(accounts[0]);
          setConnectWallet(accounts[0]);
          accountAd = accounts[0];
          addresvalue = accountAd.substring(0, accountAd.length - 31) + "...";

          setaddress(addresvalue);
          getData();
          loadNFTs();
          loadMyNFTs()
          loadListedNFTs();

          switch (netId) {
            case 1:
              console.log("(accounts[0], 2)", (accounts[0], 2));
              console.log("This is mainnet");
              break;
            case 2:
              console.log("This is the deprecated Morden test network.");
              break;
            case 3:
              console.log("This is the ropsten test network.");
              break;
            default:
              console.log("(accounts[0], 2)", (accounts[0], 1));

            // console.log("This is an unknown network.");
          }
        });
        // this.props.dispatch(login(accounts[0]));

        window.ethereum.on("accountsChanged", function (accounts) {
          // this.props.dispatch(login(accounts[0]));
          web3.eth.net.getId().then((netId) => {
            switch (netId) {
              case 1:
                console.log("This is mainnet");
                break;
              case 2:
                console.log("This is the deprecated Morden test network.");
                break;
              case 3:
                console.log("This is the ropsten test network.");
                break;
              default:
                console.log("This is an unknown network.");
            }
          });
        });
      }
    } catch (error) {
      console.log("error", error);
      setconnected(false);
    }
  };

  var getData = async () => {
    try {
      console.log("contract", "getData");
      const web3 = window.web3;
      //console.log("contract", contract);
      let contract2 = new web3.eth.Contract(contractabi2, contractAddress2);
      console.log("contract", contract2);

      let contractsupply = await contract2.methods.totalSupply().call();
      console.log("mmm", contractsupply)
      setsupply(contractsupply)




    } catch (e) {
      console.log("error", e);
    }
  };

  const loadNFTs = async () => {
    //loadMyNFTs();   
    const web3 = new Web3("https://bsc-dataseed.binance.org/");
    let contract = new web3.eth.Contract(contractabi1, contractAddress1);
    console.log("kkkk", contract)
    let contract1 = new web3.eth.Contract(contractabi2, contractAddress2);
    const data = await contract1.methods.fetchMarketItems().call();
    console.log("market", data)

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract1.methods.tokenURI(i.tokenId).call();
      console.log("market", tokenUri)
      const meta = await axios.get(tokenUri)
      console.log("market", meta)
      //let priceee = web3.utils.fromWei(i.priceee);
      let price = i.price;
      let pricee = web3.utils.fromWei(price, 'ether');
      //let price = i.price;
      let item = {
        pricee,
        price,
        itemIdd: i.itemId,
        itemId: i.itemId,
        seller: i.seller,
        owner: i.owner,
        image: meta.data.video,
        name: meta.data.name,
        times: meta.data.times,
        rarity: meta.data.rarity,
        //description: meta.data.description,
      }
      return item
    }))
    setNfts(items)
    console.log("market", nfts)
    setLoadingState('loaded')
  }
  var hh = []

  const loadMyNFTs = async () => {
    //loadWeb3();    
    const web3 = window.web3;
    let contract = new web3.eth.Contract(contractabi1, contractAddress1);
    console.log("kkkk", contract)
    let contract1 = new web3.eth.Contract(contractabi2, contractAddress2);
    const data1 = await contract1.methods.fetchMyNFTs(accountAd).call();
    console.log("my", data1)

    const items1 = await Promise.all(data1.map(async i => {
      const tokenUri = await contract1.methods.tokenURI(i.tokenId).call();
      console.log("my", tokenUri)
      const meta = await axios.get(tokenUri)
      console.log("my", meta)
      //let pricee = web3.utils.fromWei(i.pricee);
      let price = i.price;
      let pricee = web3.utils.fromWei(price, 'ether');
      let item = {
        pricee,
        price,
        itemIdd: i.itemId,
        itemId: i.itemId,
        seller: i.seller,
        owner: i.owner,
        image: meta.data.video,
        name: meta.data.name,
        times: meta.data.times,
        rarity: meta.data.rarity,
        //description: meta.data.description,
      }
      return item
    }))
    setMyNfts(items1)
    hh.push(items1)
    sethin(true)
    console.log("my", mynfts)
    setLoadingState('loaded')
  }

  const loadListedNFTs = async () => {
    //loadWeb3();    
    const web3 = window.web3;
    let contract = new web3.eth.Contract(contractabi1, contractAddress1);
    console.log("kkkk", contract)
    let contract1 = new web3.eth.Contract(contractabi2, contractAddress2);
    const data1 = await contract1.methods.fetchItemsListed(accountAd).call();
    console.log("listed", data1)

    const items2 = await Promise.all(data1.map(async i => {
      const tokenUri = await contract1.methods.tokenURI(i.tokenId).call();
      console.log("listed", tokenUri)
      const meta = await axios.get(tokenUri)
      console.log("listed", meta)
      //let pricee = web3.utils.fromWei(i.pricee);
      let price = i.price;
      let pricee = web3.utils.fromWei(price, 'ether');
      let item = {
        pricee,
        price,
        itemIdd: i.itemId,
        itemId: i.itemId,
        seller: i.seller,
        owner: i.owner,
        image: meta.data.video,
        name: meta.data.name,
        times: meta.data.times,
        rarity: meta.data.rarity,
        //description: meta.data.description,
      }
      return item
    }))
    setListedNfts(items2)
    hh.push(items2)
    sethin(true)
    console.log("listed", listednfts)
    setLoadingState('loaded')
  }


  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <ActiveContext.Provider
      value={{
        address,
        supply,
        loadNFTs,
        walletconnect,
        loadWeb3, connectWallet, show, showmeta, showwallet, setShow, account, nfts, walletvalue, mynfts, listednfts
      }}
    >
      <Router>
        <Layout>

          <div className="app">
            <Routes>
              <Route exact path="/" element={<HomePage address={address} loadNFTs={loadNFTs} walletconnect={walletconnect} loadWeb3={loadWeb3} connectWallet={connectWallet} show={show} showmeta={showmeta} showwallet={showwallet} setShow={setShow} account={account} nfts={nfts} walletvalue={walletvalue}
              />} />
              <Route exact path="/shop" element={<ShopPage loadWeb3={loadWeb3} walletvalue={walletvalue} supply={supply} loadMyNFTs={loadMyNFTs} loadNFTs={loadNFTs} />} />
              <Route exact path="/inventory" element={<InventryPage loadNFTs={loadNFTs} loadWeb3={loadWeb3} walletvalue={walletvalue} loadWeb3={loadWeb3} mynfts={mynfts} listednfts={listednfts} loadMyNFTs={loadMyNFTs} hi={hi} hh={hh}
              />} />
              <Route exact path="/market" element={<MarketplacePage loadNFTs={loadNFTs} walletconnect={walletconnect} loadWeb3={loadWeb3} connectWallet={connectWallet} show={show} showmeta={showmeta} showwallet={showwallet} setShow={setShow} account={account} nfts={nfts} walletvalue={walletvalue} />} />

            </Routes>

          </div>
        </Layout>
      </Router>
    </ActiveContext.Provider>
  );
};

export default App;
