import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";

import store from "../app/store";
import Header from "./Header";
import HeaderToday from "./HeaderToday";
import Navigation from "./Navigation";

export default function AppLayout() {
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <Provider store={store}>
        <HeaderToday />
        <Outlet />
      </Provider>
      <Navigation />
    </div>
  );
}
