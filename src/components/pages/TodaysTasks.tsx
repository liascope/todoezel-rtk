import {useSelector, useDispatch} from 'react-redux'

 import { today } from "../../lib/config";
import { markDeleted, checkTask, selectTodaysTasks } from './doLaterSlice'
import ToggleList from "../ui/ToggleList"


export default function TodaysTasks (){
   const dispatch = useDispatch();

  const todaysTasks = useSelector(selectTodaysTasks)

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