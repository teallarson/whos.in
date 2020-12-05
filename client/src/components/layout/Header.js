import React from 'react';
import letterhead from '../../img/birthcottageletterhead.webp';

 function Header() {
  return (
    <div id="birth-cottage-letterhead" className="mb-4 mt-4 header">
      <img src={letterhead} alt="Birth Cottage letterhead" />
      <div id ="return-button" className="mt-3">
      <a href="http://www.cottagebirth.com" className="btn btn-sm btn-outline-secondary col-2">Back to Birth Cottage Site</a>
      </div>
    </div>
  )
}

export default Header;