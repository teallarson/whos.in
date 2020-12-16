import React from 'react';
import letterhead from '../../img/whosinlogo.png';
import {Link} from 'react-router-dom';

 function Header() {
   
  return (
    <div>
      <div id="birth-cottage-letterhead" className="mb-4 mt-4 img-fluid">
        <img src={letterhead} alt="Birth Cottage letterhead" className="mx-auto"/>
        <div id="d-flex row">
          <div id ="return-button" className="mt-3 d-flex">
            <Link to="/" className="btn btn-outline-secondary">Back to Main Page</Link>
          </div>
          <div id ="return-button" className="mt-3 d-flex">
            <Link to="/login" className="btn btn-outline-secondary">Log in to Provider Portal</Link>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default Header;