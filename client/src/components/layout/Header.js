import React from 'react';
import letterhead from '../../img/whosinlogo.png';

 function Header() {
   
  return (
    <div>
      <div id="birth-cottage-letterhead" className="mb-4 mt-4 img-fluid">
        <img src={letterhead} alt="Birth Cottage letterhead" className="mx-auto"/>
        <div id ="return-button" className="mt-3 d-flex">
          <a href="#" className="btn btn-sm btn-outline-secondary">Back to Main Site</a>
        </div>
      </div>
    </div>
  )
}

export default Header;