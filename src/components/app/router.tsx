import { createBrowserRouter} from 'react-router-dom'

import AppLayout from '../layout/AppLayout';
import TodaysTasks from '../pages/TodaysTasks';
import DoLater from '../pages/DoLater'
import TodoShop from '../pages/todoAndShop/TodoShop';
import SavedTasks from '../pages/SavedTasks';
import NotFound from '../ui/NotFound';

export const router = createBrowserRouter([
  {element: <AppLayout/>,
    children: [
      { path: "/", element: <TodoShop type="todoes" /> },
      { path: "/shop", element:<TodoShop type="shopItem" /> },
      {path:'/do-later', element:<DoLater/>}, 
      {path:'/saved', element:<SavedTasks/>},
      {path:'/today', element:<TodaysTasks/>},
      { path: "*", element: <NotFound /> }
    ]
  }
 ]);