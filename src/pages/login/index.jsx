import React from "react";
import "./index.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserAllDataAction } from "../../redux/action/userDataAction";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDataRedux = useSelector((state) => state.userDataReducer);

  const onFinish = async (values) => {
    try {
      dispatch(getUserAllDataAction({ type: "PENDING" }));
      const { data } = await axios.post(
        `http://localhost:3000/auth/signIn`,
        values,
        { withCredentials: true }
      );
      if (data?.created) {
        if (data?.data?.role === "admin") {
          dispatch(getUserAllDataAction({ type: "FULFILLED", payload: data }));
          navigate(`admin/${data?.data?._id}`);
        } else {
          message.error("You are not authorized to enter");
        }
      } else {
        message.error(data?.message);
        dispatch(
          getUserAllDataAction({ type: "REJECTED", payload: data?.message })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(getUserAllDataAction({ type: "REJECTED", payload: error }));
    }
  };

  console.log(userDataRedux);

  return (
    <div id="loginPage">
      <div className="container">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={userDataRedux?.loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
