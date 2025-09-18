import React from 'react';

function Notfound(){
      return (
    <div className=" justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-3">404 Page Not Found!</h1>
      <p className="lead">This page does not exist.</p>
      <img 
        src="public/image/notfound.jpg" 
        alt="404 Not Found" 
        className="img-fluid" 
        style={{ maxWidth: '70%' }}
      />
    </div>
  );
}

export default Notfound;