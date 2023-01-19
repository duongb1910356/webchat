import React from "react";
import Login from "./views/Login";
import Register from "./views/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./views/Chat";
import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import Test from "./components/Test";
import AddFriend from "./components/AddFriend";
import { FriendProvider } from "./contexts/FriendContext";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <UserProvider>
        <FriendProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path="chat/*" element={<Chat />}>
                  <Route path='test' element={<Test />} />
                  <Route path="addfriend" element={<AddFriend />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </FriendProvider>

      </ UserProvider>

    )
  }
}


export default App