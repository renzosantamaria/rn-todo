import React from "react";
import { Provider } from "react-redux";
import ReduxStore from "./src/store/index"

import TodoApp from "./src/index"


const App: React.FC= () => {
  return(
    <Provider store={ReduxStore}>
      <TodoApp />
    </Provider>
  )
};

export default App;