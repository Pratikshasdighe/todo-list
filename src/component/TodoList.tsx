import React from "react";
import "./style.css";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { selectCompleted } from "../Redux/store";

interface Props {
  // todo: Todo[];
  todo: Todo[];

  // setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  // completedTodo: Todo[];
  // setCompletedTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todo,
}: // setTodos,
// completedTodo,
// setCompletedTodo,
Props) => {
  const completedTodo = useSelector(selectCompleted);
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided) => (
          <div
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_heading">Active Tasks</span>

            {todo.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                // todos={todos}
                key={todo.id}
                // setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided) => (
          <div
            className="todos remove"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_heading">completed Tasks</span>
            {completedTodo.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                // todos={completedTodo}
                key={todo.id}
                // setTodos={setCompletedTodo}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
