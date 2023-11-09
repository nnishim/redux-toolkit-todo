import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Link, useLocation } from 'react-router-dom';
import GoogleSignInButton from '../google-auth/GoogeAuth';

const Header = () => {
  // const location = useLocation();
  // const [links, setLinks] = useState([
  //   { text: 'Главная', href: '/', active: false },
  // ]);

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.navbar}>
          <div className={`${styles.logo} ${styles.navbar_logo}`}>
            <Link to="/">LOGO</Link>
          </div>
          <div className={styles.navbar_links}>
            {/* {links.map((link, index) => (
              <Link
                to="/"
                key={index}
                className={`${styles.navbar_link} ${
                  location.pathname === link.href
                    ? styles.navbar_link__active
                    : ''
                }`}
              >
                {link.text}
              </Link>
            ))} */}
            <GoogleSignInButton />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
