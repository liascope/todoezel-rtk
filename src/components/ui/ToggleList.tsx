import { useState } from "react";
import { motion } from "framer-motion";
import type { ToggleListProps } from "../../lib/types";

export default function ToggleList({ tasks, onDelete, onToggle, toggle = true, maxHeight = "max-h-135 md:max-h-85 lg:max-h-80" }: ToggleListProps) {
  const [toggleItems, setToggleItems] = useState<Record<string, boolean>>({});

  return (
    <ul onClick={(e) => e.stopPropagation()} className={`overflow-y-auto w-full md:pb-24 pb-12 ${maxHeight}`}>
      {tasks?.map((task) => (
        <motion.li
          key={task.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="even:bg-black/30 odd:bg-black/50 text-left mx-2 md:mx-7 px-3 md:px-7 text-md md:text-xl py-1 md:py-4 my-2 md:my-4 rounded flex justify-between md:font-medium hover:bg-black/20"
          onClick={() => setToggleItems((prev) => ({ ...prev, [task.id]: !prev[task.id] }))}
        >
          <span className={task?.done ? "line-through opacity-50" : ""}>{task?.task}</span>
          <div className="flex items-center gap-1 max-h-">
            {!toggleItems[task.id] && toggle ? (
              <input
                key={task.id}
                type="checkbox"
                checked={!!task?.done}
                onClick={(e) => e.stopPropagation()}
                onChange={() => onToggle?.(task.id, task)}
                className="w-4 h-4 md:w-6 md:h-6 ml-7 md:ml-3"
              />
            ) : (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(task.id, task);
                }}
                className="cursor-pointer text-red-400 hover:text-red-600 hover:scale-150 ml-7 md:ml-3"
              >
                ✗
              </span>
            )}
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
