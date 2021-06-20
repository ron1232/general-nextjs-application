import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@/schema/authSchema';
import AuthContext from '@/context/AuthContext';
import http from '@/services/http';

export default function RegisterPage() {
  const [disabled, setDisabled] = useState(false);

  const { register: registerUser, error } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    error && toast.error(error);
  });

  const onSubmit = async ({ username, email, password }) => {
    registerUser({ username, email, password });
  };

  return (
    <Layout title='User Register'>
      <div className={styles.auth}>
        <h1>
          <FiUser /> Register
        </h1>
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
            <label htmlFor='username'>Username</label>
            {errors.username && (
              <span className={styles.error}>
                * {errors?.username?.message}
              </span>
            )}
            <input
              type='text'
              id='username'
              name='username'
              {...register('username')}
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
            <label htmlFor='confirm_password'>Confirm Password</label>
            {errors.confirm_password && (
              <span className={styles.error}>
                * {errors?.confirm_password?.message}
              </span>
            )}
            <input
              type='password'
              id='confirm_password'
              name='confirm_password'
              {...register('confirm_password')}
            />
          </div>
          <input
            type='submit'
            disabled={disabled}
            value='Register'
            className='btn'
          />
        </form>
        <p>Already have an accout?</p>
        <Link href='/account/login'>Login</Link>
      </div>
    </Layout>
  );
}
