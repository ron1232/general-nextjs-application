import Layout from '@/components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import http from '@/services/http';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import { content } from '@/static/formFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import GoBack from '@/components/GoBack';
import { eventSchema } from '@/schema/eventSchema';
import { capitalizeFirstLetter, formatDate } from 'utils/functions';
import { BsFillImageFill } from 'react-icons/bs';

export default function EditEventPage({ evt }) {
  const [disabled, setDisabled] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image?.formats?.thumbnail?.url : null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      name: evt.name,
      performers: evt.performers,
      venue: evt.venue,
      address: evt.address,
      date: formatDate(evt.date),
      time: evt.time,
      description: evt.description,
    },
  });

  const onSubmit = async (values) => {
    const { data, res } = await http(`${API_URL}/events/${evt.id}`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
      method: 'PUT',
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
    <Layout title={`Edit Event`}>
      <GoBack />
      <h1>Edit Event</h1>
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
                Event {capitalizeFirstLetter(input.name)}:
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
          value='Update Event'
          className='btn'
        />
      </form>
      {imagePreview ? (
        <>
          <h2>Event Image:</h2>
          <Image src={imagePreview} height={100} width={170} />
        </>
      ) : (
        <div>
          <p>
            <i>No image uploaded</i>
          </p>
        </div>
      )}

      <div>
        <button className='btn-secondary'>
          <BsFillImageFill style={{ paddingTop: '0.2rem' }} /> Set Image
        </button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const { data: evt } = await http(`${API_URL}/events/${id}`);

  return {
    props: {
      evt,
    },
  };
}
