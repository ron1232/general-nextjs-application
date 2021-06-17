import { FiUser } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schema/authSchema';
import AuthContext from '@/context/AuthContext';
import http from '@/services/http';
import { identifierToEmail } from 'utils/functions';

export default function LoginPage() {
  const [disabled, setDisabled] = useState(false);

  const { login, error } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    error && toast.error(error.identifierToEmail()) && setDisabled(false);
  });

  const onSubmit = async ({ email, password }) => {
    login({ email, password });
    setDisabled(true);
  };

  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <h1>
          <FiUser /> Login
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
          <div>
            <label htmlFor='email'>Email Address</label>
            {errors.email && (
              <span className={styles.error}>* {errors?.email?.message}</span>
            )}
            <input
              type='email'
              id='email'
              name='email'
              {...register('email')}
            />
            <label htmlFor='password'>Password</label>
            {errors.password && (
              <span className={styles.error}>
                * {errors?.password?.message}
              </span>
            )}
            <input
              type='password'
              id='password'
              name='password'
              {...register('password')}
            />
          </div>
          <input
            type='submit'
            disabled={disabled}
            value='Login'
            className='btn'
          />
        </form>
        <p>Don't have an accout?</p>
        <Link href='/account/register'>Register</Link>
      </div>
    </Layout>
  );
}
