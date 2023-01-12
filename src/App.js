<<<<<<< HEAD
import './App.css';
import React from 'react';
import LoginPage from "./views/Login"

class App extends React.Component{
 
  render(){
    return (
      <h1>gf</h1>
    );
=======
import React from "react";
import Login from "./views/Login";
import Register from "./views/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./views/Chat";
import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import Test from "./components/Test";
import AddFriend from "./components/AddFriend";

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
              <Route path="chat/*" element={<Chat />}>
                <Route path='test' element={<Test />} />
                <Route path="addfriend" element={<AddFriend />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ UserProvider>

    )
>>>>>>> addfriend
  }
}


export default App