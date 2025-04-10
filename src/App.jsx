import { useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Body from './Body';
import Login from './Login';
import Profile from './Profile';

function App() {
const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path='/login' element={<Login />}/>
            <Route path='/profile' element={<Profile />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
