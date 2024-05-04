import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter
import Head from "./Components/Head";
import Body from "./Components/Body";
import store from "./ultils/store";
import WatchPage from "./Components/WatchPage";
import MainContainer from "./Components/MainContainer";
import SearchResults from "./Components/SearchResults";
function App() {
  return (
    <Provider store={store}>
      <Router> {/* Wrap your components in BrowserRouter */}
        <div className="App">
          <Head />
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<MainContainer />} />
              <Route path="watch" element={<WatchPage />} />
              <Route path="results" element={<SearchResults />} />

            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
