import React from 'react';
import style from './todo.module.sass';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import type Todo from '../../types/TodoType';
import { MdDelete, MdDateRange } from 'react-icons/md';
import { FiCheckCircle } from 'react-icons/fi';
import { useAppDispatch } from '../../hooks/hook';
import { removeTodos } from '../../redux/thunks/todoThunk';
import { checkTodos } from './../../redux/thunks/todoThunk';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const TodoItem: React.FC<Todo> = ({ title, text, _id, completed, createdAt }): JSX.Element => {
  const dispatch = useAppDispatch();

  const checkTodoHandler = (id: string) => {
    dispatch(checkTodos({ id }));
  };

  const removeTodoHandler = (id: string) => {
    dispatch(removeTodos({ id }));
  };

  return (
    <div 
      className={style.todo}
      style={completed ? { background: '#00FF7F' } : { background: '#fceb8c' }}
      key={_id}
    >
      <div className={style.text}>
        <div className={style.block}>
          <h1>{title}</h1>
          <IconButton onClick={() => removeTodoHandler(_id)} className={style.icon_remove}>
            <MdDelete />
          </IconButton>
        </div>
        <span> {text.length < 500 ? text : `${text.substring(0, 500)}...... `}</span>
      </div>
      <div className={style.info}>
        <div className={style.info__date}>
          <MdDateRange className={!completed ? style.icon_blue : style.icon_white} />{' '}
          <span style={completed ? { color: '#fff' } : { color: '#000' }}>
            : {createdAt?.toString().substring(0, 10)}
          </span>{' '}
        </div>
        <div className={style.info__more}>
          <Link to={`/todo/${_id}`}>
            <Button variant="outlined">Подробнее</Button>
          </Link>
        </div>
        <div className={style.info__done}>
          {!completed ? (
            <IconButton onClick={() => checkTodoHandler(_id)} className={style.active}>
              <FiCheckCircle style={{ fontSize: '28px' }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => checkTodoHandler(_id)} className={style.completed}>
              <AiOutlineCloseCircle style={{ fontSize: '30px' }} />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
