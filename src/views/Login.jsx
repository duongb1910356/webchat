import React, { useContext } from "react";
import backgroundImage from "../asset/background-login.jpeg";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate, Link } from "react-router-dom"; //import module điều hướng
import Auth from "../service/Auth"
import UserContext from "../contexts/UserContext";
export default function APINavigate() {
    const navigate = useNavigate();
    return <Login navigate={navigate} />
}

class Login extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this)
    }
    test() {
        Auth.test();
    }

    async onFinish(values) {
        const { user, setUser } = this.context;
        try {
            const st = await Auth.login(values);
            setTimeout(
                () => { return setUser(st.data), 300 }
            );
            this.props.navigate("/chat")
        } catch (error) {
            alert(error.response.data)
        }
    };

    render() {
        const background = {
            backgroundImage: `url(${backgroundImage})`,
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

        }
        const boxLogin = {
            borderRadius: "20px",
            boxShadow: "0px 4px 4px rgba(60, 49, 187, 0.91)",
            minWidth: "470px",
            minHeight: "630px",
            background: "rgba(255, 255, 255, 0.82)",
            backdropFilter: "blur(3px)",
            padding: "15px",
            justifyContent: "center",
            display: "flex"
        }

        const iteminput = {
            fontSize: "18px",
        }

        return (
            <div style={background}>
                <div style={boxLogin}>
                    <Form
                        method="POST"
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <h1 style={{ marginInlineStart: "20%" }}>ĐĂNG NHẬP</h1>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email!',
                                },
                            ]}
                        >
                            <Input style={iteminput} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="pass"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập password!',
                                },
                            ]}
                        >
                            <Input
                                style={iteminput}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox style={iteminput}>Ghi nhớ đăng nhập</Checkbox>
                            </Form.Item>

                            <a style={iteminput} className="login-form-forgot" href="">
                                Quên mật khẩu
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button style={{ width: "100%", fontSize: "20px", height: "auto" }} type="primary" htmlType="submit" className="login-form-button">
                                Xác nhận
                            </Button>
                            <span style={iteminput}>Chư có tài khoản <Link to="/register">Đăng ký!</Link></span>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

// export default Login