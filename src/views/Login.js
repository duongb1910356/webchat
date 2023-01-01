import React from "react";
import Login from "../components/Login"
import { Layout  } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class LoginPage extends React.Component {
    render() {
        return (
            <Login />
        )

    }
}

export default LoginPage;