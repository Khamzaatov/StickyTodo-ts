import React from 'react';
import Button from '@mui/material/Button';
import style from './todo.module.sass';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { useNavigate, useParams } from 'react-router-dom';
import { editTodos, fetchTodos } from '../../redux/thunks/todoThunk';
import { FaCheck } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';

const TodoPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const todos = useAppSelector((state) => state.todo.todos.filter((todo) => todo._id === id));
  const todoItem: any = todos?.find((item) => item);

  const [inputValue, setInpuValue] = React.useState<string>('');
  const [textAreaValue, setTextAreaValue] = React.useState<string>('');
  const [changeTodo, setChangeTodo] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const editTextHandler = (title: string, text: string) => {
    setInpuValue(title);
    setTextAreaValue(text);
    setChangeTodo(true);
  };

  const saveTextHandler = () => {
    dispatch(
      editTodos({
        id: id,
        title: inputValue,
        text: textAreaValue,
      }),
    );
    setChangeTodo(false);
  };

  return (
    <div className={style.container}>
      <div className={style.text}>
        {todos.map((todo) => {
          return (
            <div key={todo._id} className={style.task}>
              {changeTodo ? (
                <input
                  className={style.task__input}
                  defaultValue={inputValue}
                  onChange={(e) => setInpuValue(e.target.value)}
                />
              ) : (
                <div className={style.task__title}>{todo.title}</div>
              )}
              {changeTodo ? (
                <textarea
                  className={style.task__textarea}
                  defaultValue={textAreaValue}
                  onChange={(e) => setTextAreaValue(e.target.value)}
                ></textarea>
              ) : (
                <div className={style.task__text}>{todo.text}</div>
              )}
            </div>
          );
        })}
      </div>
      <div className={style.buttons}>
        <div>
          <div>
            Создана:{' '}
            <span style={{ fontWeight: '600' }}>
              {new Date(todoItem?.createdAt).toLocaleString()}
            </span>
          </div>
          <div>
            Изменена:{' '}
            <span style={{ fontWeight: '600' }}>
              {new Date(todoItem?.updatedAt).toLocaleString()}
            </span>
          </div>
          <div>Завершена: {todoItem?.completed ? <FaCheck className={style.comp} /> : <CgClose className={style.act} />}</div>
        </div>
        {changeTodo ? (
          <Button onClick={saveTextHandler} className={style.buttons__change} variant="outlined">
            Сохранить
          </Button>
        ) : (
          <Button
            onClick={() => editTextHandler(todoItem.title, todoItem.text)}
            className={style.buttons__save}
            variant="outlined"
          >
            Изменить
          </Button>
        )}
        <Button onClick={() => navigate(-1)} className={style.buttons__close} variant="outlined">
          Закрыть
        </Button>
      </div>
    </div>
  );
};

export default TodoPage;
