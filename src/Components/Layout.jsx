import React, { useContext, useState } from "react";
import { ActiveContext } from "../App";
import Header from "./Header/Header";

const Layout = ({ children }) => {
  const { address,
    loadNFTs,
    walletconnect,
    loadWeb3, connectWallet, show, showmeta, showwallet, setShow, account, nfts, walletvalue } =
    useContext(ActiveContext);




  return (
    <div >
      <Header />
      {children}
    </div>
  );
};

export default Layout;
