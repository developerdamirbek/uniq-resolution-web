import { Button, Form, Input } from 'antd';
import { EyeIcon, EyeOffIcon, UserRound } from 'lucide-react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useLogin } from './services/useLogin';

export const Auth = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useLogin();

  const onFinish = (values: { email: string, password: string }) => {
    mutate(values, {
      onSuccess: (data) => {
        Cookies.set("accessToken", data.access_token);
        Swal.fire({
          title: "You have logged in successfully!",
          icon: "success",
        });

        navigate("/", { replace: true });

      },
      onError: (error: any) => {
        Swal.fire({
          title: error?.response.data?.message || "Login failed",
          text: "Please check your email and password.",
          icon: "error",
        });
      }
    })
  };


  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="border border-gray-200 shadow-2xl p-10 rounded-2xl">
        <Form
          layout="vertical"
          name="loginForm"
          style={{ width: 400 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="flex flex-col w-full !font-poppins"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
            className="w-full"
          >
            <Input suffix={<UserRound />} className="w-full !rounded-xl !p-2 !font-poppins" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            className="w-full"
          >
            <Input.Password
              iconRender={(visible) => (visible ? <EyeIcon /> : <EyeOffIcon />)}
              className="w-full !rounded-xl !p-2 !font-poppins"
            />
          </Form.Item>

          <Form.Item className="!mb-0">
            <Button loading={isPending} className="w-full !rounded-xl !h-10 !font-medium" type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
