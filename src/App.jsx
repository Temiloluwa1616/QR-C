import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QrCode from './QR Code/QrCode'
import Form from './QR Code/Form'
import LandingPage from './landingpage/LandingPage'
import Navbar from './QR Code/Navbar'
import { Route, Routes } from 'react-router-dom'
import StudentF from './studentform/StudentF'
import Visitor from './Visitor/Visitor'
import ImgApi from './studentform/StudentF'
import Interns from './Interns/Interns'
import AdminSignup from './Admin/AdminSignup'
import AdminPanel from './Admin/AdminPanel'


function App() {


  return (
    <>
     <div>
      {/* <QrCode/> */}
      {/* <Form/> */}
      {/* <LandingPage/> */}
      {/* <Navbar/> */}


      <Routes>
        <Route>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/client'  element={<Form/>}/>
          <Route path='/student'  element={<StudentF/>}/>
          <Route path='/visitor'  element={<Visitor/>}/>
          <Route path='/interns' element={<Interns/>}/>
          <Route path='/AdminSignup' element={<AdminPanel/>}/>
        </Route>
      </Routes>
     </div>
    </>
  )
}

export default App
