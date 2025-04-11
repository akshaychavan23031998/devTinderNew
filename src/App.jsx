import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import Feed from './components/Feed';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

function App() {
const [count, setCount] = useState(0)

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path='/feed' element={<Feed />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/profile' element={<Profile />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;
