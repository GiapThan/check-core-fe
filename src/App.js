import { Route, Routes } from 'react-router-dom';
import './App.css';

import Redirect from './component/Redirect/Redirect';
import DSTT from './component/DSTT/DSTT';
import Login from './component/Login/Login';
import Create from './component/Create/Create';
import ClassRoom from './component/ClassRoom/ClassRoom';
import UpDate from './component/UpDate/UpDate';
import Delete from './component/Delete/Delete';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dstt/create" element={<Create />} />
        <Route path="/dstt/class" element={<ClassRoom />} />
        {/* 
        <Route path="/dstt/update" element={<UpDate />} />
        <Route path="/dstt/delete" element={<Delete />} /> */}
        <Route path="/dstt/:chuong/:lesson" element={<DSTT />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Redirect />} />
      </Routes>
    </div>
  );
}

export default App;
