import { useNavigate, useLocation} from 'react-router-dom';
import { today } from "../../lib/config";

import Percent from "../ui/Percent";
import ArrowIcon from "../ui/NavIcons/ArrowIcon";
import { selectTodaysTasks } from '../pages/doLaterSlice';
import { useAppSelector } from '../app/store';

export default function HeaderToday() {
const todaysTasks = useAppSelector(selectTodaysTasks)
const navigate = useNavigate();
const { pathname } = useLocation();

const todaysHeaderOpen = pathname === '/today'
const notDeletedTasks = todaysTasks?.filter(task => !task.delete);

function handleTodaysHeaderClick(){
if (!todaysTasks?.length || !notDeletedTasks?.length) return;
navigate('/today'); 
if (pathname === '/today') {
  navigate('/'); 
}
}

 return ( <div
  className={`flex relative flex-row uppercase justify-between pt-2
    bg-stone-700/25 transition-all duration-300 shadow-lg shadow-stone-600 rounded-xl mx-2 sm:mx-6 sm:px-3 ${notDeletedTasks?.length > 0 ? 'cursor-pointer' : 'cursor-base'}`} onClick={handleTodaysHeaderClick}>

    <div className="text-xs sm:text-lg absolute top-2 left-2 sm:top-6 sm:left-6 tracking-tight text-shadow-lg">TODAY | {today}</div>
    <div className="mt-3 sm:mt-12 sm:ml-12"><Percent arr={notDeletedTasks} /></div>
 
  <div className={` flex items-center ${notDeletedTasks?.length > 0 ? 'justify-center' : 'justify-between'} mr-2 sm:px-20 w-[70%]`}>

    <span className={`${todaysHeaderOpen ? 'bg-sky-400/40' :'bg-amber-400/40'} mask-r-from-80% py-2 px-4 text-xs sm:text-xl font-black flex-1 max-w-lg truncate`}> 

    {todaysHeaderOpen
  ? `${notDeletedTasks?.every(task => task.done) ? 'All done for Today!' : "Todays Todoes🟢"}`
  : notDeletedTasks?.length > 0 ? `${notDeletedTasks?.every(task => task.done) ? 'You did 100%!' : notDeletedTasks[0]?.task}` : 'No Tasks for today 📭'}

    </span>
{notDeletedTasks?.length > 0 && <> <span className="ml-3 w-fit">
  {notDeletedTasks?.every(task => task?.done) ? '🎉':'🟢'}
  </span> <ArrowIcon toggle={todaysHeaderOpen}/>
</>}
  </div>
</div>

);}
