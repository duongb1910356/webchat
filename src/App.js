import React from "react";
import Login from "./views/Login";
import Register from "./views/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./views/Chat";
import "./App.css";
import { UserProvider } from "./contexts/UserContext";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path="chat" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ UserProvider>

    )
  }
}


export default App