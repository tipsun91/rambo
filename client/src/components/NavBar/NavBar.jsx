import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NavBar() {
  const { user } = useSelector(state => state.user);

  return (
    <nav className="navbar">
      <div className="lk">
        <h2>Привет{ user && user.name ? `, ${user.name}` : ', Гость' }</h2>
      </div>
    </nav>
  );
}
