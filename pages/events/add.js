import Layout from '@/components/Layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import http from '@/services/http';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import { content } from '@/static/formFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import GoBack from '@/components/GoBack';
import { eventSchema } from '@/schema/eventSchema';
import { parseCookies } from '@/utils/cookie';
import { authCookieKey } from '@/utils/config';

export default function AddEventPage({ authToken }) {
  const [disabled, setDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(eventSchema),
  });

  const onSubmit = async (values) => {
    const { data, res } = await http(`${API_URL}/events`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(values),
      method: 'POST',
    });
    setDisabled(true);

    if (!res.ok) {
      toast.error('Something went wrong :(');
      setDisabled(false);
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate={true}
      >
        <div className={styles.grid}>
          {content.inputs.map((input, i) => (
            <div key={i}>
              <label htmlFor={input.name}>
                Event {input.name.capitalizeFirstLetter()}:
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

export async function getServerSideProps({ req }) {
  const authToken = parseCookies(req)?.[authCookieKey];

  return {
    props: { authToken },
  };
}
