import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Section from './pages/Section/Section';
import Modal from './components/Modal/Modal';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import { useAppSelector } from './hooks/hook';
import { Routes, Route, Navigate } from 'react-router-dom';
import './style.sass';

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
          <Route path="/login" element={<SignIn />} />
          <Route path="/registration" element={<SignUp />} />
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
        <Route path="/todos" element={<Navigate to="/login" />} />
        <Route path="/registration" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default App;
