import React from 'react'
import{Link} from 'react-router-dom'
import './Welcome.css'
function Welcome() {
  return (
    <div className='background'>
<div className='content'>
  <h1>Welcome Page</h1>

  <div className='buttons'>  <Link to='/login' typeof='button'><button>Login</button></Link>
  <Link to='/register'><button typeof='button'>Register</button></Link></div>

</div>
      
    </div>
  )
}

export default Welcome