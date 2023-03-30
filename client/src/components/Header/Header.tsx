import React from 'react';
import logo from '../../assets/borz.jpg';
import style from './header.module.sass';
import IconButton from '@mui/material/IconButton';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hook';
import { useAppDispatch } from './../../hooks/hook';
import { logOut } from '../../redux/slices/userSlice';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { ImExit } from 'react-icons/im';
import { changeModalStatus } from '../../redux/slices/todoSlice';

const Header: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { username, token } = useAppSelector((state) => state.user);

  const openModalHandler = () => {
    dispatch(changeModalStatus(true));
  };

  const exit = () => {
    dispatch(logOut());
  };

  return (
    <header>
      <NavLink to="/">
        <img className={style.logo} src={logo} alt="" title="На главную" />
      </NavLink>
      <div className={style.auth}>
        {!token ? (
          <>
            <NavLink to="/login">
              <span className={style.login}>Логин</span>
            </NavLink>
            <NavLink to="/registr">
              <span className={style.registr}>Регистрация</span>
            </NavLink>
          </>
        ) : (
          <>
            <span className={style.username}>Привет, {username}!</span>
            <NavLink to="/login">
              <span title="Выход" onClick={exit} className={style.logOut}>
                <IconButton>
                  <ImExit />
                </IconButton>
              </span>
            </NavLink>
            <div className={style.add_todo} title="Добавить">
              <IconButton onClick={openModalHandler}>
                <IoIosAddCircleOutline />
              </IconButton>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
