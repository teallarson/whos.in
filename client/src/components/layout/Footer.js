import React from 'react'

 function Footer() {
  return (
    <div>
      <small className="m-2 p-3 text-muted">
       Copyright &copy; {new Date().getFullYear()} Teal Larson      
      </small>
    </div>
  )
}

export default Footer