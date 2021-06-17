import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email().required('required'),
  password: yup.string().required('required'),
});

export const registerSchema = yup.object().shape({
  email: yup.string().email().required('required'),
  username: yup.string().required('required'),
  password: yup.string().required('required'),
  confirm_password: yup
    .string()
    .required('required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
