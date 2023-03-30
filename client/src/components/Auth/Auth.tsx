import React from 'react';
import style from './auth.module.sass';
import { useAppDispatch, useAppSelector } from './../../hooks/hook';
import { useNavigate } from 'react-router-dom';
import { signInThunk } from './../../redux/thunks/userThunk';

type InputType = {
  username: string;
  password: string;
};

const initState = {
  username: '',
  password: '',
};

const Auth: React.FC = (): JSX.Element => {
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
    if ((inputState.username && inputState.password) && (status === 'error' && errorAuth)) {
      alert(errorAuth);
    }
    if (status === 'success') {
      navigate('/todos', { replace: true });
    }
  }, [status]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputState.username || !inputState.password) {
      alert('Поле ввода не должно быть пустым!');
    }
    dispatch(signInThunk(inputState));
  };

  return (
    <div className={style.auth}>
      <form onSubmit={submitHandler}>
        <input
          name="username"
          value={inputState.username}
          onChange={changeHandler}
          type="text"
          placeholder="username"
        />
        <input
          name="password"
          value={inputState.password}
          onChange={changeHandler}
          type="text"
          placeholder="password"
        />
        <button>Авторизация</button>
      </form>
    </div>
  );
};

export default Auth;
