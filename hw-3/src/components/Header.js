import React from 'react';

function Header() {
  return (
    <React.Fragment>
      <div className="header-split">
        <img src="./ciceksepeti.png" alt="header-logo" />

        <input type="text" placeholder="Search..."></input>

        <p>Number of Cards: {}</p>
      </div>
    </React.Fragment>
  )
}

export default Header;