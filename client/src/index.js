import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false
});

ReactDOM.render(<App />, document.querySelector("#root"));
