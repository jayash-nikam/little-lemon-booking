import React, { useState, useEffect } from 'react';
import logo from '../images/Logo .svg';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      // scrolling down
      setHidden(true);
    } else {
      // scrolling up
      setHidden(false);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${hidden ? 'navbar--hidden' : ''}`}>
      <a href='/' className='logo' aria-label="Home">
        <img src={logo} alt='logo' />
      </a>

      {/* mobile icon */}
      <div className='menu-icon' onClick={toggleMenu} aria-label="Toggle menu" role="button" tabIndex="0">
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
      </div>

      {/* links */}
      <ul className={`nav-links ${menuOpen ? 'visible' : ''}`}>
        <li><a href='/'>Home</a></li>
        <li><a href='/'>About</a></li>
        <li><a href='/'>Menu</a></li>
        <li><a href='/booking'>Reservations</a></li>
        <li><a href='/'>Order Online</a></li>
        <li><a href='/'>Login</a></li>
      </ul>
    </nav>
  );
};

export default Nav;
