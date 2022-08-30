import React, { useEffect, useRef } from "react";
import { Todo } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";

import { Draggable } from "react-beautiful-dnd";
import {
  done,
  remove,
  editText,
  selectEditTodo,
  changeEdit,
  addEdit,
  // selectCompleted,
  // editmode,
} from "../Redux/store";
type Props = {
  index: number;
  todo: Todo;

  // todos: Todo[];

  // setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ index, todo }: Props) => {
  const dispatch = useDispatch();
  let editTodo = useSelector(selectEditTodo);
  // let completed = useSelector(selectCompleted);

  // const [edit, setEdit] = useState<boolean>(false);
  // const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (
    id: number,
    todo: string,
    isDone: boolean,
    edit: boolean,
    createdat: Date
  ) => {
    dispatch(done({ id, todo, isDone, edit, createdat }));

    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    //   )
    // );
  };

  const handleDelete = (id: number) => {
    dispatch(remove(id));
    console.log(id);

    // setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleSubmit = (
    e: React.FormEvent,
    id: number,
    // inputRef: React.RefObject<HTMLInputElement>
    editTodo: string,
    edit: boolean
  ) => {
    e.preventDefault();
    dispatch(addEdit({ id, editTodo, edit }));
  };
  const handleEdit = (
    e: React.FormEvent,
    id: number,
    edit: boolean,
    editTodo: string
  ) => {
    console.log("clicked");
    // Edit = true;

    dispatch(editText({ id, edit, editTodo }));
    //   setTodos(
    //     todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    //   );
    //   setEdit(false);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [todo.edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todo_single"
          onSubmit={(e) => {
            handleSubmit(e, todo.id, editTodo, todo.edit);
            inputRef.current?.blur();
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {todo.edit ? (
            <input
              type="input"
              value={editTodo}
              onChange={(e) => {
                const { value } = e.target;
                dispatch(changeEdit(value));
              }}
              className="todo_single--text"
              // ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todo_single--text">{todo.todo}</s>
          ) : (
            <>
              <span className="todo_single--text">{todo.todo}</span>
            </>
          )}

          <div>
            {/* <span className="todo_single--text">{todo.todo}</span> */}
            <span
              className="icon"
              onClick={(e) => {
                // Edit = true;
                // handleEdit(e, todo.id);
                if (!todo.edit && !todo.isDone) {
                  // dispatch(editmode(todo.id));
                  handleEdit(e, todo.id, todo.edit, editTodo);
                }
              }}
              // onClick={(e) => handleEdit(e, todo.id)}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span
              className="icon"
              onClick={() =>
                handleDone(
                  todo.id,
                  todo.todo,
                  todo.isDone,
                  todo.edit,
                  todo.createdat
                )
              }
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
