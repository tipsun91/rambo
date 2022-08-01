import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './components/App/App';
import Main from './components/Main/Main';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Profile from './components/Profile/Profile';
import Dialogues from './components/Dialogues/Dialogues';
import Dialog from './components/Dialog/Dialog';
import Rating from './components/Rating/Rating';
import NoPage from './components/NoPage/NoPage';
import GameMenu from './components/GameMenu/GameMenu';

export default function Map() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="/main" element={<Main />} />
        <Route path="/sign/in" element={<Signin />} />
        <Route path="/sign/up" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dialogues" element={<Dialogues />} />
        <Route path=":id" element={<Dialog />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/game" element={<GameMenu />} />
        <Route path="page/:page" element={<Rating />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
