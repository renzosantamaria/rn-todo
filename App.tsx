import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import TodosTabNavigator from './navigation/TodoNavigator'

const App: React.FC = () => {
  return(
    <Provider store={store}>
      <TodosTabNavigator></TodosTabNavigator>
    </Provider>
  )
};

export default App;