import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="podcast_header">
            <Link to={'/'}><div className="top_title">Podcaster</div></Link>
            <hr/>
        </div>
      </div>
    </header>
  );
};

export default Header;