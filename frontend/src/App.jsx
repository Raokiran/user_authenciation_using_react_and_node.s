import React from 'react'
import{BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import Welcome from './Welcome/Welcome'
import Register from './Register/Register'
import Login from './log/Log_in'
import Home_page from './Home/Home_page'

function App() {
  return (
    <div>
      <Router>
        <Routes>
        
          <Route path='/' element={<Welcome/>} ></Route>
          <Route path='/register' element={<Register/>} ></Route>
          <Route path='/home' element={<Home_page/>} ></Route>
          <Route path='/login' element={<Login/>} ></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App