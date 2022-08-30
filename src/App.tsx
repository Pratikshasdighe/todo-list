import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import logo from "./logo.svg";
import "./App.css";
// import InputField from "./compoenet/InputField";
import InputField from "./component/InputField";
// import TodoList from "./compoenet/TodoList";
import TodoList from "./component/TodoList";
// import { Todo } from "./model";
import {
  selectTodo,
  add,
  selectCompleted,
  drag,
  dragcomplete,
  dragcompletetodo,
  dragactive,
} from "./Redux/store";

// import { DragDropContext } from "react-beautiful-dnd";

const App: React.FC = () => {
  let todos = useSelector(selectTodo);
  console.log(todos);
  let completedTodo = useSelector(selectCompleted);

  const dispatch = useDispatch();
  // const newTodoRef = useRef<HTMLInputElement>(null);
  // const [todo, setTodo] = useState<string>("");
  // const [todos, setTodos] = useState<Todo[]>([]);
  // const [completedTodo, setCompletedTodo] = useState<Todo[]>([]);

  const handleAdd = (e: any, inputRef: React.RefObject<HTMLInputElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      dispatch(add(inputRef.current.value));
      // setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      // setTodo("");
    }
  };
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    console.log(result);
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let add,
      active = todos,
      complete = completedTodo;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      // console.log("1", add);
      const index = source.index;
      dispatch(drag(index));
      // active.splice(source.index, 1);

      // active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      // console.log("2", add);
      // complete.splice(source.index, 1);
      dispatch(dragcompletetodo(source.index));
    }
    if (destination.droppableId === "TodosList") {
      // active.splice(destination?.index, 0, add);
      const index = destination?.index;
      dispatch(dragactive({ index, add }));
    } else {
      // complete.splice(destination?.index, 0, add);
      const index = destination?.index;
      dispatch(dragcomplete({ index, add }));
    }
    // completedTodo = complete;
    console.log("completed", completedTodo);
    // todos = active;
    console.log("active", todos);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">TASKIFY</span>
        {/* <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} /> */}
        {/* {todos.map((t) => (
        <li>{t.todo}</li>
      ))} */}
        <InputField handleAdd={handleAdd} />

        {/* /> */}
        <TodoList
          todo={todos}
          // todo={todos}
          // todos={todos}
          // setTodos={setTodos}
          // completedTodo={completedTodo}
          // setCompletedTodo={setCompletedTodo}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
