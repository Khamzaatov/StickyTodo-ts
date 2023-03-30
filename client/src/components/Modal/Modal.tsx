import React from 'react';
import style from './modal.module.sass';
import { changeModalStatus } from '../../redux/slices/todoSlice';
import { VscChromeClose } from 'react-icons/vsc';
import { useAppDispatch } from './../../hooks/hook';
import { addTodos } from '../../redux/thunks/todoThunk';

const Modal: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = React.useState<string>('');
  const [textAreaValue, setTextAreaValue] = React.useState<string>('');

  const closeModal = () => {
    dispatch(changeModalStatus(false));
  };

  const addTodoHandler = () => {
    dispatch(
      addTodos({
        title: inputValue,
        text: textAreaValue,
      }),
    );
    setInputValue('');
    setTextAreaValue('');
  };

  return (
    <>
      <div className={style.modalOverlay}></div>
      <div className={style.modalDialog}>
        <div onClick={closeModal} className={style.close}>
          <VscChromeClose />
        </div>
        <h3 className={style.createTask}>Создайте свою заметку</h3>
        <input
          name="input"
          className={style.title}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          placeholder="Введите заголовок..."
        />
        <textarea
          name="textarea"
          onChange={(e) => setTextAreaValue(e.target.value)}
          value={textAreaValue}
          placeholder="Введите текст..."
          className={style.message}
        ></textarea>
        <button onClick={addTodoHandler} className={style.button}>
          Добавить
        </button>
      </div>
    </>
  );
};

export default Modal;
