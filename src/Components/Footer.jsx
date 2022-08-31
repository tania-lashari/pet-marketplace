import React from "react";

import logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__title">Need more information?</div>
      <div className="footer__contact">
        <div className="contact__title">Contact us</div>
        <img className="contact__logo" src={logo} />
      </div>
      <div className="footer__mail">hello@diamondfoot.io</div>
      <div className="footer__copy-right">©2022 DFT All rights reserved.</div>
    </div>
  );
};

export default Footer;
