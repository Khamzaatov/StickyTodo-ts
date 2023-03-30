import React from 'react';
import style from './main.module.sass';
import prog from '../../assets/prog.jpg';

const Main: React.FC = (): JSX.Element => {
  return (
    <div className={style.container}>
      <img src={prog} alt="" />
    </div>
  );
};

export default Main;
