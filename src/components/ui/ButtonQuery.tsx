import { useEffect, useState } from "react"
import { generateUUID } from "../../lib/config";

import Button from "./Button";
import PlusIcon from "./NavIcons/PlusIcon";
import Spinner from "./Spinner";

import type { ButtonQueryProps } from "../../lib/types";

// reusable Comp for Todoes, Shop, Do-Later
export default function ButtonQuery({ setTasks, tasks, placeholder }: ButtonQueryProps) {
  const [query, setQuery] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [addTask, setAddTask] = useState(false);

  useEffect(() => {
    setDisabled(query.trim() === '');
  }, [query]);

  function handleSubmit(e:React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (query.trim() === '') return;

    setAddTask(true);
    setTasks([
      ...tasks,
      { id: generateUUID(), task: query.trim(), done: false, delete: false },
    ]);
    setQuery('');
    setTimeout(() => setAddTask(false), 300);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-row items-center justify-center">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full m-1 my-5 sm:my-9 p-2 text-sm sm:text-lg text-center border border-emerald-400 bg-stone-900/70 rounded-sm sm:rounded-md"
      />

      <Button type="submit" disabledOnDefault={disabled}>
        {addTask ? <Spinner /> : <PlusIcon />}
      </Button>
    </form>
  );
}
