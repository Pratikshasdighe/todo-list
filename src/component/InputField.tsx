import React, { useRef } from "react";
import "./style.css";

interface Props {
  //   todo: string;

  //   setTodo: React.Dispatch<React.SetStateAction<string>>;
  // handleAdd: (e: React.FormEvent) => void;
  handleAdd: any;
}

// const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
const InputField = ({ handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e, inputRef);

        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="input"
        // value={todo}
        placeholder="enter a task"
        className="input_box"
        // onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
