import { deleteTask } from "./doLaterSlice";
import { useAppDispatch, useAppSelector } from "../app/store";
import type { DoLaterEntry } from "../../lib/types";

export default function SavedTasks() {
  const savedTasks: DoLaterEntry[] = useAppSelector((store) => store.doLater.allSavedTasks);

  const dispatch = useAppDispatch();

  function handleDelete(date: string) {
    dispatch(deleteTask(date));
  }

  const sortedTasks = savedTasks.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <>
      <h2 className="uppercase text-center font-extrabold">
        {savedTasks.length > 0 ? "Your Saved Tasks or Notes 🗂️" : "No Saved Tasks or Notes 🗂️"}
      </h2>
      <ul className="list-none mx-1 my-1 md:mx-8 md:my-10 text-center md:pb-24 pb-12 max-h-125 md:max-h-113 overflow-y-auto ">
        {savedTasks.length > 0 &&
          sortedTasks.map((entry) => (
            <li
              key={entry.date}
              className="odd:bg-black/30 z-10 even:bg-black/50 text-justify mx-2 md:mx-16 px-3 md:px-16 md:text-xl py-1 md:py-4 my-2 md:my-4 rounded flex justify-between font-medium hover:bg-black/20"
            >
              <span>
                <strong className="mx-1 md:mx-4">{entry.date} ▶ </strong>
                {entry.tasks.map((t, i) => (
                  <span key={t.id} className={t.done ? "opacity-50 mr-1 md:mr-3" : "mr-1 md:mr-3"}>
                    {t.task}
                    {i < entry.tasks.length - 1 ? ", " : ""}
                  </span>
                ))}
              </span>{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(entry.date);
                }}
                className="cursor-pointer text-red-400 hover:text-red-600 ml-7 md:ml-3 flex items-center "
              >
                ✗
              </span>
            </li>
          ))}
      </ul>
    </>
  );
}
