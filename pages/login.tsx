import MainLayout from '@/layouts/mainLayout';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { UserSubmitForm } from '@/types/globalTypes';
import { validationLogin } from '@/utils/validators';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { loginUser, setToken, setUser } from '@/slices/userSlice';
import { ToastContainer, toast } from 'react-toastify';

// {
//   "email": "akinsiku.o@yahoo.com",
//   "password": "femiakinsiku"

// }

const FormTitle = styled.h1`
  text-align: center;
  // margin-bottom: 20px;
  color: #000;
  font-weight: 500;
  padding: 30px 0;
`;

const Input = styled.input`
  width: 100%;
  // margin: 0 auto;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 10px;
  margin-bottom: 10px;
  background: #fff;
  color: #000;
  align-self: flex-start;
`;

const Form = styled.form`
  background: #fff;
  color: #000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 90%;
  }

  label {
    text-transform: capitalize;
    color: #000;
    font-size: 15px;
    margin-bottom: 2px;
    margin-bottom: 10px;
    align-self: flex-start;
  }
`;

const ErrorText = styled.small`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
  align-self: flex-start;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 4px;
  background: green;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
`;

const SmallText = styled.small`
  margin-top: 10px;
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationLogin),
  });

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const tokenStr =
      typeof window !== 'undefined' && localStorage.getItem('tokenstr');
    if (tokenStr) {
      const token = JSON.parse(tokenStr);
      router.push('/');
    }
  }, [router]);

  const onSubmit = async (data: UserSubmitForm) => {
    try {
      const user = {
        email: data.email,
        password: data.password,
      };

      const response = await dispatch(loginUser(user) as any);

      if (response.payload.success === true) {
        localStorage.setItem(
          'tokenstr',
          JSON.stringify(response.payload.token),
        );

        toast.success(response.payload.message, {
          position: 'top-center',
          pauseOnHover: true,
          autoClose: 4000,
        });

        dispatch(setToken(response.payload.token));
        dispatch(setUser(response.payload.user));
        router.push('/');
      } else {
        toast.error(response.error.message, {
          position: 'top-center',
          pauseOnHover: true,
          autoClose: 4000,
        });
      }
    } catch (err: any) {
      toast.error(err.message, {
        position: 'top-center',
        pauseOnHover: true,
        autoClose: 4000,
      });
    }
    reset();
  };

  return (
    <MainLayout title="Tinder for cats - Login" height="100vh">
      <FormTitle>Login</FormTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <Input type="email" placeholder="Enter Email" {...register('email')} />
        <ErrorText>{errors.email?.message}</ErrorText>

        <label htmlFor="password">Password</label>
        <Input
          type="password"
          placeholder="Enter Password"
          {...register('password')}
        />
        <ErrorText>{errors.password?.message}</ErrorText>

        <Button type="submit">Submit</Button>

        <SmallText>
          <Link href="/signup">Do not have have an account? Signup</Link>
        </SmallText>
      </Form>
      <ToastContainer />
    </MainLayout>
  );
};

export default Login;
