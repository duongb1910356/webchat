import React from "react";
import Login from "./views/Login";
import Register from "./views/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./views/Chat";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
}


export default App