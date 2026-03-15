import {Provider} from 'react-redux'
import { Outlet } from "react-router-dom";

import store from "../app/store";
import Header from "./Header";
import HeaderToday from "./HeaderToday";
import Navigation from "./Navigation";

export default function AppLayout() {
 
  return (<div className='min-h-full flex flex-col'>
   <Header /> 
   <Provider store={store}> 
   <HeaderToday/><div className='uppercase sm:m-7 m-2 rounded-xl shadow-lg shadow-stone-600 py-2 sm:py-7 bg-stone-700/25 max-h-screen text-center'>
   <Outlet/></div>
   </Provider>
   <Navigation/> 
   </div>);
 }
