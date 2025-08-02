
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import DashBoard from './components/DashBoard';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/DashBoard' element={<DashBoard />}></Route>
        <Route path='/Register' element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
