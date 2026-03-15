import {useSelector, useDispatch} from 'react-redux'
import { deleteTask } from './doLaterSlice'

export default function SavedTasks(){
  const savedTasks = useSelector(store=> store.doLater.allSavedTasks)

   const dispatch = useDispatch();
   function handleDelete(date){
   dispatch(deleteTask(date))
 } 

 const sortedTasks = savedTasks?.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

    return (<><h2 className='uppercase text-center font-extrabold' >{savedTasks.length > 0 ? 'Your Saved Tasks or Notes 🗂️' : 'No Saved Tasks or Notes 🗂️' }</h2>
    <ul className="list-none mx-1 my-1 sm:mx-8 sm:my-10 text-center sm:pb-24 pb-12 max-h-125 sm:max-h-113 overflow-y-auto ">
    
  {savedTasks.length > 0 && (
  sortedTasks.map((entry) => (
    <li
      key={entry.date}
      className="odd:bg-black/30 z-10 even:bg-black/50 text-justify mx-2 sm:mx-16 px-3 sm:px-16 sm:text-xl py-1 sm:py-4 my-2 sm:my-4 rounded flex justify-between font-medium hover:bg-black/20"
    ><span>
      <strong className="mx-1 sm:mx-4">{entry.date} ▶ </strong> 
     {entry.tasks.map((t, i) => (
  <span
    key={t.id}
    className={t.done ? "opacity-50 mr-1 sm:mr-3" : "mr-1 sm:mr-3"}
  >
    {t.task}
    {i < entry.tasks.length - 1 ? ", " : ""}
  </span>
))}

 </span> <span
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(entry.date);
          }}
          className="cursor-pointer text-red-400 hover:text-red-600 ml-7 sm:ml-3 flex items-center "
        >
          ✗
        </span>
    </li>
  )))}

</ul></>)
}
