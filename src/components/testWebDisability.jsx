import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav aria-label="Hauptnavigation">
      <ul role="menubar">
        <li role="menuitem">
          <Link to="/" activeClassName="active-link" aria-label="Zur Startseite">Startseite</Link>
        </li>
        <li role="menuitem">
          <Link to="/about" activeClassName="active-link" aria-label="Über uns">Über uns</Link>
        </li>
        <li role="menuitem">
          <Link to="/contact" activeClassName="active-link" aria-label="Kontakt">Kontakt</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
