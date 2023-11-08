import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { useNavigate } from 'react-router-dom';
import { signInThunk } from '../../redux/thunks/userThunk';
import './auth.sass';

type InputType = {
  username: string;
  password: string;
};

const initState = {
  username: '',
  password: '',
};

const SignIn: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { status, errorAuth } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const [inputState, setInputState] = React.useState<InputType>(initState);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setInputState({
      ...inputState,

      [name]: value,
    });
  };

  React.useEffect(() => {
    if (inputState.username && inputState.password && status === 'error' && errorAuth) {
      alert(errorAuth);
    }
    if (status === 'success') {
      navigate('/todos', { replace: true });
    }
  }, [status]);

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!inputState.username || !inputState.password) {
      alert('Поле ввода не должно быть пустым!');
    }
    dispatch(signInThunk(inputState));
  };

  return (
    <div className="container">
      <div className="right2"></div>
      <div className="left">
        <div className="header">
          <h2 className="animation a1">Авторизация</h2>
          <h4 className="animation a2">
            Войдите в свою учетную запись, используя имя пользователя и пароль
          </h4>
        </div>
        <form onSubmit={submitHandler}>
          <div className="form">
            <input
              name="username"
              type="text"
              value={inputState.username}
              onChange={changeHandler}
              className="form-field animation a3"
              placeholder="Имя пользователя"
            />
            <input
              type="password"
              name="password"
              value={inputState.password}
              onChange={changeHandler}
              className="form-field animation a4"
              placeholder="Пароль"
            />
            <p className="animation a5">
              <a href="#">Forgot Password</a>
            </p>
            <button className="animation a6">Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
