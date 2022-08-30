import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
  edit: boolean;
  createdat: any;
}

interface TodoSliceState {
  todo: Todo[];

  completed: Todo[];
  editTodo: string;
  // edit: boolean;
}
let initialState: TodoSliceState = {
  todo: [],
  // edit: false,
  completed: [],
  editTodo: "",
};
// type Actions =
//   | { type: "add"; payload: string }
//   | { type: "remove"; payload: number }
//   | { type: "done"; payload: number };

export const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.todo = [
        ...state.todo,
        {
          id: Date.now(),
          todo: action.payload,
          isDone: false,
          edit: false,
          createdat: new Date(),
        },
      ];
    },
    remove: (state, action: PayloadAction<number>) => {
      state.todo = state.todo.filter((todo) => todo.id !== action.payload);
    },
    addEdit: (
      state,
      action: PayloadAction<{ id: number; editTodo: string; edit: boolean }>
    ) => {
      const index = state.todo.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todo[index].todo = action.payload.editTodo;
      state.todo[index].edit = !action.payload.edit;
      state.editTodo = "";
    },
    done: (
      state,
      action: PayloadAction<{
        id: number;
        todo: string;
        isDone: boolean;
        edit: boolean;
        createdat: Date;
      }>
    ) => {
      const index = state.todo.findIndex(
        (todo) => todo.id === action.payload.id
      );
      // state.completed:action.payload
      const status = state.completed.map(
        (todo) => todo.id !== action.payload.id
      );

      state.completed.splice(
        // action.payload.index,
        index,
        1,
        // action.payload.add,
        action.payload,
        ...state.completed
      );

      state.todo[index].isDone = !action.payload.isDone;
      state.todo.splice(index, 1);

      // state.todo.splice(index, 0, action.payload);

      // state.todo.map((todo) =>
      //   todo.id === action.payload.id
      //     ? { ...state.todo, isDone: !todo.isDone }
      //     : state.todo
      // );
    },
    // editmode: (state, action: PayloadAction<number>) => {
    //   const ID = state.todo.map((todo) => todo.id === action.payload);
    //   const index = state.todo.findIndex((todo) => todo.id === action.payload);
    //   if (ID) {
    //     state.edit = !state.edit;
    //   } else state.edit = state.edit;
    // },
    editText: (
      state,
      action: PayloadAction<{ id: number; edit: boolean; editTodo: string }>
    ) => {
      const index = state.todo.findIndex(
        (todo) => todo.id === action.payload.id
      );

      // state.todo[index].isDone = !action.payload
      state.todo[index].edit = !action.payload.edit;
      // state.todo[index].todo = action.payload.editTodo;
      // state.todo[index].edit = !state.todo;

      // state.todo.map((todo) =>
      //   todo.id === action.payload
      //     ? { ...state.todo, todo: state.editTodo }
      //     : todo
      // );
      // state.edit = false;
    },
    changeEdit: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.editTodo = action.payload;
    },
    drag: (state, action: PayloadAction<number>) => {
      state.todo.splice(action.payload, 1);
    },
    dragcomplete: (
      state,
      action: PayloadAction<{ index: number; add: any }>
    ) => {
      state.completed.splice(
        action.payload.index,
        1,
        action.payload.add,
        ...state.completed
      );
    },
    dragcompletetodo: (state, action: PayloadAction<number>) => {
      state.completed.splice(action.payload, 1);
    },
    dragactive: (state, action: PayloadAction<{ index: number; add: any }>) => {
      // active.splice(destination?.index, 0, add);
      state.todo.splice(action.payload.index, 0, action.payload.add);
    },
  },
});

export const {
  add,
  remove,

  done,
  editText,
  changeEdit,
  addEdit,
  drag,
  dragcomplete,
  dragcompletetodo,
  dragactive,
} = todoSlice.actions;

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});
type RootState = ReturnType<typeof store.getState>;

export const selectTodo = (state: RootState) => state.todo.todo;
export const selectEditTodo = (state: RootState) => state.todo.editTodo;
export const selectCompleted = (state: RootState) => state.todo.completed;

export default store;
