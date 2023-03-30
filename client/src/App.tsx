import { useAppSelector } from './hooks/hook';
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Auth from './components/Auth/Auth';
import Registr from './components/Auth/Registr';
import Section from './pages/Section/Section';
import './style.sass';
import Modal from './components/Modal/Modal';

const App: React.FC = () => {
  const token = useAppSelector((state) => state.user.token);
  const modalStatus = useAppSelector((state) => state.todo.modalStatus);

  if (token) {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/todos" element={<Section />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/registr" element={<Registr />} />
        </Routes>
        {modalStatus && <Modal />}
      </>
    );
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/registr" element={<Registr />} />
        <Route path="/todos" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
