
// import { useEffect, useMemo, useState } from 'react'





// export default function Login(props: Record<string, any>) {
//   console.log(props)
//   const [count, useCount] = useState(0);
//   const Double = useMemo(() => {
//     return count * 2
//   }, [count])
//   const click = () => {
//     useCount(count + 1)
//   }
//   return <div onClick={click}>登录页面{props.message},开始点击{Double}次
//   </div>
// }

// export async function getStaticProps() {
//   return {
//     props: {
//       message: '123456'
//     }
//   }
// }

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { request } from './../../utils/fetch'


const Login: React.FC = () => {


  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    request('/webapi/vteam_login/API_Login', { acc: values.username, pwd: values.password }).then((res) => {
      console.log(res)

      request('/webapi/vteam_member_ui/API_GetCurrentLoginMember').then((res) => {
        console.log(res)
      })
      request('/webapi/vteam_my/API_GetMyPersonalProject').then((res) => {
        console.log(res)
      })
    })
  };


  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
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
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
