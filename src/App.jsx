import React from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'
import List from './components/list'

function App() {

  return (
    <>

    <Navbar /><br />
    <div className="container"><List /></div>
    
    </>
    
  )
}

export default App
