import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './components/login/login';
import SignUp from "./components/signUp/SignUp"
import Home from './components/Home/Home';
import DisplayData from './components/MainPage/MainPage';
import Formdata from './components/MainPage/FormData';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path='displayData' element={<DisplayData/>}/>
        <Route path="formData" element={<Formdata/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
