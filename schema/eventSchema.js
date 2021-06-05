import * as yup from 'yup';

export const eventSchema = yup.object().shape({
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
