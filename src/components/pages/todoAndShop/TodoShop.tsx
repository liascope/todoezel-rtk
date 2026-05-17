import { useState } from "react";
import { doneTasksToDelete } from "../../../lib/config";
import Button from "../../ui/Button";
import ButtonQuery from "../../ui/ButtonQuery";
import Percent from "../../ui/Percent";
import ToggleList from "../../ui/ToggleList";
import useStorage from "../../../lib/useStorage";
import BinIcon from "../../ui/NavIcons/BinIcon";
import Confirm from "../../ui/Confirm";
import type { Todo, TodoShopProps } from "../../../lib/types";

// reusable Comp for Todo ('/') & Shop ('/shop') - state without date
export default function TodoShop({ type }: TodoShopProps) {
  const [todoes, setTodoes, error] = useStorage<Todo[]>(type, []);
  const [confirm, setConfirm] = useState(false);
  const maxReached = todoes.filter((t) => t.done && !t.delete).length >= doneTasksToDelete;

  return (
    <>
      {" "}
      {confirm && (
        <Confirm
          clickYes={() => {
            setTodoes((prev) => prev.filter((item) => !item.done));
            setConfirm(false);
          }}
          clickNo={() => setConfirm(false)}
        />
      )}{" "}
      <div className="max-w-screen md:px-5 flex flex-row items-center mx-1 md:mx-6 justify-end  relative">
        {type === "todoes" && <Percent arr={todoes}></Percent>}

        <div className="w-full flex items-center flex-row">
          <ButtonQuery
            tasks={todoes}
            setTasks={setTodoes}
            placeholder={type === "todoes" ? "Add Todoes / Notes.." : "Add Shop Items.."}
          ></ButtonQuery>
          <Button onClick={() => setConfirm(true)} disabledOnDefault={!maxReached} customStyle="text-xs">
            {" "}
            <BinIcon maxReached={maxReached} />
          </Button>{" "}
        </div>
      </div>
      {error ? (
        <div className="text-center">Storage Problem.</div>
      ) : todoes.length === 0 ? (
        <div className="text-center uppercase font-extrabold mt-5">
          {type === "todoes" ? "No Todoes / Notes Yet 📋" : type === "shopItem" ? "No Shop Items Yet 🛒" : ""}
        </div>
      ) : (
        <ToggleList
          tasks={todoes}
          onDelete={(id) => setTodoes((prev) => prev.filter((item) => item.id !== id))}
          onToggle={(id) => setTodoes((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)))}
        />
      )}{" "}
    </>
  );
}
