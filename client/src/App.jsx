import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'


import Signin from './components/parts/Signin'
import Main from './components/parts/Main'
import Signup from './components/parts/Signup'


function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element = {<Main/>}/>
        <Route path='/signin' element ={<Signin/>}></Route>
        <Route path='/signup' element ={<Signup/>}></Route>
        <Route></Route>
      </Routes>
    </>
  )
}


export default App
