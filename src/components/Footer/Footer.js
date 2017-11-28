import React from "react";
import "./Footer.css";
var footerStyle = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}
const Footer = () =>
<div>
  <div style={phantom}>
  </div>
  <div style={footerStyle}>
    <span>Slosh.io 2017</span>
  </div>
</div>;


export default Footer;
