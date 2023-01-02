import React from "react";
import backgroundImage from "../asset/background-login.jpeg";
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useNavigate, Link } from "react-router-dom"; //import module điều hướng

class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    onFinish(values) {
        console.log('Received values of form: ', values);
    };

    render() {
        const props = {

            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

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
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <h1 style={{ marginInlineStart: "28%" }}>ĐĂNG KÝ</h1>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập username!',
                                },
                            ]}
                        >
                            <Input style={iteminput} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nhập username" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập emai!',
                                },
                            ]}
                        >
                            <Input style={iteminput} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Nhập email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
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
                                placeholder="Nhập password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="repassword"
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
                                placeholder="Nhập lại password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="avatar"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui chọn ảnh đại diện!',
                                },
                            ]}
                        >
                            <Upload {...props}
                                beforeUpload={() => false}
                            >
                                <Button style={iteminput} icon={<UploadOutlined />}>Click để chọn ảnh</Button>
                            </Upload>

                        </Form.Item>
                        
                        <Form.Item>
                            <Button style={{ width: "100%", fontSize: "20px", height: "auto" }} type="primary" htmlType="submit" className="login-form-button">
                                Xác nhận
                            </Button>
                            <span style={iteminput}>Đã có tài khoản <Link to="/">Đăng nhập!</Link></span>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Register