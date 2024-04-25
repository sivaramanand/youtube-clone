import "./App.css";
import { Provider } from "react-redux";
import Head from "./Components/Head";
import Body from "./Components/Body";
import store from "./ultils/store";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Head />
        <Body />
      </div>
    </Provider>
  );
}

export default App;
