import React from 'react';
import TodoList from '../../components/Todo/TodoList';
import style from './section.module.sass';
import Filter from '../../components/Filter/Filter';

const Section: React.FC = (): JSX.Element => {
  return (
    <div className={style.container}>
      <div className={style.filter}>
        <Filter />
      </div>
      <div className={style.list}>
        <TodoList />
      </div>
    </div>
  );
};

export default Section;
