import './index.css'
import {RouterProvider, } from 'react-router-dom'
import { router } from './components/app/router'
import ErrorBoundary, {ErrorMsg} from './components/layout/ErrorBoundary'



function App() {
  return (    <ErrorBoundary fallback={<ErrorMsg/>}>
 <RouterProvider router={router}></RouterProvider></ErrorBoundary>
  )
}

export default App
