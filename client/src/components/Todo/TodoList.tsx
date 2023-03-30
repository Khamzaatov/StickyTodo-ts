import React from 'react';
import { changeModalStatus } from '../../redux/slices/todoSlice';
import { useAppDispatch, useAppSelector } from './../../hooks/hook';
import { fetchTodos } from './../../redux/thunks/todoThunk';
import style from './todo.module.sass';
import TodoItem from './TodoItem';

const TodoList: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { todos, search } = useAppSelector((state) => state.todo);

  React.useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const openModalHandler = () => {
    dispatch(changeModalStatus(true));
  };

  const searchTodos = React.useMemo(() => {
    if (!search) return todos;

    return todos.filter((todo) => {
      return todo.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, todos]);  

  return (
    <section>
      <div className={style.container}>
        {!searchTodos.length ? (
          <div className={style.not_found}>Ничего не найдено...</div>
        ) : (
          <>
            {searchTodos.map((todo) => {
              return <TodoItem key={todo._id} {...todo} />;
            })}
            <div onClick={openModalHandler} className={style.add_todo}>
              +
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TodoList;
