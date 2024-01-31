import "../App.scss";
import { Provider } from "react-redux";
import { BrowserRouter, Routes } from "react-router-dom";
import { store } from "../store";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { Content } from "./layout/Content";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Header />
          <Content>
            <Routes>

            </Routes>
          </Content>
          <Footer />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
