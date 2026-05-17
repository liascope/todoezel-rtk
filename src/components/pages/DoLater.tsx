import { useState } from "react";
import { Link } from "react-router-dom";

import { addTasks } from "./doLaterSlice";
import ToggleList from "../ui/ToggleList";
import ButtonQuery from "../ui/ButtonQuery";
import Button from "../ui/Button";
import SaveIcon from "../ui/NavIcons/SaveIcon";
import Spinner from "../ui/Spinner";
import type { Todo } from "../../lib/types";
import { useAppDispatch, useAppSelector } from "../app/store";

export default function DoLater() {
  const dispatch = useAppDispatch();
  const savedDate = useAppSelector((state) => state.doLater.savedDate);

  const [date, setDate] = useState("");
  const [doLater, setDoLater] = useState<Todo[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  function handleSave() {
    setIsSaving(true);
    dispatch(addTasks({ tasks: doLater, date }));
    setDoLater([]);
    setDate("");
    setTimeout(() => setIsSaving(false), 2500);
  }
  const disabled = doLater.length === 0 || date.trim() === "";

  return (
    <div className="max-w-screen p-1 md:px-5">
      <div
        className={`transition-all duration-500 ease-out backdrop-blur-2xl bg-stone-700/25 shadow-lg shadow-sky-600
    rounded-xl text-amber-600 font-medium uppercase text-center
 ${isSaving ? "max-h-20 opacity-80 translate-y-0 px-10 py-2" : "max-h-0 opacity-0 -translate-y-2 px-0 py-0"}`}
      >
        Tasks saved for {savedDate}
      </div>

      <Link to="/saved">
        <div className="w-full bg-emerald-400  hover:bg-sky-400 transition-colors shadow-2xl duration-300 ease-in-out h-fit px-11 cursor-pointer text-center rounded-sm md:rounded-md my-5 mb-2 md:my-9 md:py-2 py-1 text-sm md:text-lg ">
          {" "}
          SHOW SAVED TASKS 🔍
        </div>
      </Link>

      <div className="flex flex-row justify-end items-center mt-5">
        <input
          className="w-full m-1 p-2 text-sm md:text-lg text-center border border-emerald-400 hover:border-amber-400 bg-stone-900/70 rounded-sm md:rounded-md"
          placeholder="Search Date 🔍📅"
          type="text"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          inputMode="numeric"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button onClick={handleSave} disabledOnDefault={disabled}>
          {isSaving ? <Spinner /> : <SaveIcon />}
        </Button>
      </div>
      <div className="flex flex-col text-center">
        <div className="flex flex-row items-center my-2 justify-end">
          <ButtonQuery tasks={doLater} setTasks={setDoLater} placeholder="Add Todoes For Later.." />
        </div>
        {doLater.length === 0 ? (
          <div className="uppercase font-extrabold">Add Todoes & Save The Date 📆</div>
        ) : (
          <ToggleList
            tasks={doLater}
            onDelete={(id) => setDoLater((prev) => prev.filter((item) => item.id !== id))}
            maxHeight="max-h-100 md:max-h-40 lg:max-h-45"
            toggle={false}
          />
        )}
      </div>
    </div>
  );
}
