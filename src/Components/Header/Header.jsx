import React, { useEffect, useState } from "react";

import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const [isMobile, setMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 900)
      setMobile(true);
  }, [typeof window]);
  return <>{isMobile ? <MobileHeader /> : <DesktopHeader />}</>;
};
export default Header;
