import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { VscChromeClose } from 'react-icons/vsc';
import { useAppSelector } from '../../hooks/hook';
import { clearSearh, setSearch } from '../../redux/slices/todoSlice';
import style from './filter.module.sass';
import { useAppDispatch } from './../../hooks/hook';

const Filter: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const search = useAppSelector((state) => state.todo.search);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const clearHandler = () => {
    dispatch(clearSearh());
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={style.container}>
      <div className={style.inp}>
        <CiSearch className={style.search} />
        <input
          value={search}
          onChange={changeHandler}
          ref={inputRef}
          type="text"
          placeholder="Поиск задачи..."
        />
        {search && <VscChromeClose onClick={clearHandler} className={style.close} />}
      </div>
    </div>
  );
};

export default Filter;
