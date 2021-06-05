import Layout from '@/components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import http from '@/services/http';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import { content } from '@/static/formFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import GoBack from '@/components/GoBack';

const capitilizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const schema = yup.object().shape({
  name: yup.string().required('required'),
  performers: yup.string().required('required'),
  venue: yup.string().required('required'),
  address: yup.string().required('required'),
  date: yup.date().required().typeError('invalid'),
  time: yup
    .string()
    .min(5, 'example: "12:00"')
    .max(5, 'example: "12:00"')
    .required('required'),
  description: yup
    .string()
    .min(10, '10 characters minimum')
    .required('required'),
});

export default function AddEventPage() {
  const [disabled, setDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    const { data, res } = await http(`${API_URL}/events`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
      method: 'POST',
    });
    setDisabled(true);

    if (!res.ok) {
      toast.error('Something went wrong :(');
    } else {
      toast.success('Added Event!');
      router.push(`/events/${data.slug}`);
    }
  };

  const router = useRouter();
  return (
    <Layout title='Add New Event'>
      <GoBack />
      <h1>Add Event</h1>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate={true}
      >
        <div className={styles.grid}>
          {content.inputs.map((input, i) => (
            <div key={i}>
              <label htmlFor={input.name}>
                Event {capitilizeFirstLetter(input.name)}:
              </label>
              {errors[input.name] && (
                <span className={styles.error}>
                  * {errors[input.name]?.message}
                </span>
              )}
              {input.type !== 'textarea' ? (
                <input
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  {...register(input.name)}
                />
              ) : (
                <textarea
                  name={input.name}
                  {...register(input.name)}
                ></textarea>
              )}
            </div>
          ))}
        </div>
        <input
          disabled={disabled}
          type='submit'
          value='Add Event'
          className='btn'
        />
      </form>
    </Layout>
  );
}
