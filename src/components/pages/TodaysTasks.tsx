import { today } from "../../lib/config";
import { markDeleted, checkTask, selectTodaysTasks } from './doLaterSlice'
import ToggleList from "../ui/ToggleList"
import { useAppDispatch, useAppSelector } from '../app/store';

export default function TodaysTasks (){
   const dispatch = useAppDispatch()
   const todaysTasks = useAppSelector(selectTodaysTasks)

function handleDelete(id:string){
  dispatch(markDeleted(id))
} 

function handleChecked (id:string){
  dispatch(checkTask(id))
}

return (todaysTasks?.length === 0  ? <div className="w-full text-center py-10">No Tasks for today | {today}</div> : <ToggleList maxHeight="max-h-132 sm:max-h-145"
        tasks={todaysTasks?.filter(t => t?.delete === false)}
        onDelete={handleDelete}
        onToggle={handleChecked}/>)
}