import './Menu.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import { FaUsers, FaTachometerAlt } from 'react-icons/fa';

function Menu() {
  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <FaTachometerAlt size={20} />
        <span>Dashboard</span>
      </div>

      <nav className="sidebar-links">
        <Link to="#beneficiaires" className="sidebar-link">
          <FaUsers size={18} />
          <span>Bénéficiaires</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <Link to="/" className="sidebar-link logout-link">
          <CiLogout size={22} />
          <span>Déconnexion</span>
        </Link>
      </div>
    </div>
  );
}

export default Menu;

