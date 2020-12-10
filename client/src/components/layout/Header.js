import React from 'react';
import letterhead from '../../img/birthcottageletterhead.webp';

 function Header() {
   
  return (
    <div>
      <div id="birth-cottage-letterhead" className="mb-4 mt-4 img-fluid">
        <img src={letterhead} alt="Birth Cottage letterhead" className="mx-auto"/>
        <div id ="return-button" className="mt-3 d-flex">
          <a href="http://www.cottagebirth.com" className="btn btn-sm btn-outline-secondary">Back to Birth Cottage Site</a>
        </div>
      </div>
    </div>
  )
}

export default Header;