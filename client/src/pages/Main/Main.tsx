import React from 'react';
import style from './main.module.sass';
import grom from '../../assets/123.jpg';

const Main: React.FC = (): JSX.Element => {
  return (
    <div className={style.container}>
      <div className={style.image}>
        <img src={grom} alt="" />
      </div>
    </div>
  );
};

export default Main;
