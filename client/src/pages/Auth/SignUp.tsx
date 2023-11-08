import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { signUpThunk } from '../../redux/thunks/userThunk';
import { useNavigate } from 'react-router-dom';
import { clearStatus } from '../../redux/slices/userSlice';
import './auth.sass';

type InputType = {
  username: string;
  password: string;
};

const initState = {
  username: '',
  password: '',
};

const SignUp: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { status2, errorRegistr } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const [inputState, setInputState] = React.useState<InputType>(initState);

  React.useEffect(() => {
    if (status2 === 'error' && errorRegistr) {
      alert(errorRegistr);
    }
    if (status2 === 'success') {
      alert('Регистрация успешно пройдена!');
      navigate('/login', { replace: true });
      dispatch(clearStatus());
    }
  }, [status2]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setInputState({
      ...inputState,

      [name]: value,
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputState.username || !inputState.password) {
      alert('Поле ввода не должно быть пустым!');
    } else {
      dispatch(signUpThunk(inputState));
    }
  };

  return (
    <div className="container">
      <div className="left">
        <div className="header">
          <h2 className="animation a1">Регистрация</h2>
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
            <button className="animation a6">Зарегистрироваться</button>
          </div>
        </form>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default SignUp;
