import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./utils/Redux/store.jsx";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter basename="/thought-loom">
          <ToastContainer />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
