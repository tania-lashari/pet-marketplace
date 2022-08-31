import React, { useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";

import AppButton from "../../common/AppButton";
import ConnectModal from "../../ConnectModal";
import { ActiveContext } from "../../App";

const DesktopHeader = () => {
  const {
    address,
    loadNFTs,
    walletconnect,
    loadWeb3, connectWallet, show, showmeta, showwallet, setShow, account, nfts, walletvalue
  } = useContext(ActiveContext);
  const { pathname } = useLocation();

  return (
    <>

      <div className="header" >
        <div className="header__left" data-aos="fade-up" >
          <Link to='/'>
            <img className="left__logo" src={logo} />
          </Link>
        </div>
        <div className="header__right" data-aos="fade-right">
          <Link to='/'
            className={pathname === '/' ? `right__text border-bottom` : `right__text`}
          >
            Home
          </Link>
          <Link to='/shop'
            className={pathname === '/shop' ? `right__text border-bottom` : `right__text`}
          >
            Shop
          </Link>
          <Link to='/inventory'
            className={pathname === '/inventory' ? `right__text border-bottom` : `right__text`}

          >
            Inventory
          </Link>
          <Link to='/market'
            className={pathname === '/market' ? `right__text border-bottom` : `right__text`}
          >
            Marketplace
          </Link>
          <div className="right__mint">
            {/* <AppButton title="CONNECT WALLET" /> */}
            <ConnectModal />
          </div>
        </div>
      </div>
    </>

  );
};

export default DesktopHeader;
