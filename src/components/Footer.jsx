import React from "react";

const year = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer page__section">
      <p className="footer__copyright">&copy; {year} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
