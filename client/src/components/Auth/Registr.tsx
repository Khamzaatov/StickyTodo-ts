import React from 'react';
import style from './auth.module.sass';
import { useAppDispatch, useAppSelector } from './../../hooks/hook';
import { signUpThunk } from '../../redux/thunks/userThunk';
import { useNavigate } from 'react-router-dom';
import { clearStatus } from '../../redux/slices/userSlice';

type InputType = {
  username: string;
  password: string;
};

const initState = {
  username: '',
  password: '',
};

const Registr: React.FC = (): JSX.Element => {
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
        <button>Регистрация</button>
      </form>
    </div>
  );
};

export default Registr;
