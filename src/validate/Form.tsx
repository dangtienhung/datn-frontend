import Yup from './global';

export const RegisterSchema = Yup.object({
  account: Yup.string().required('Account is required').regexMatch('Email or Phone is not valid'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required').checkLength('Password >= 5 charactor'),
  confirmpassword: Yup.string()
    .required('ConfirmPassword is required')
    .oneOf([Yup.ref('password')], 'ConfirmPassword is not valid'),
});

export const LoginSchema = Yup.object({
  account: Yup.string().required('Account is required').regexMatch('Email or Phone is not valid'),
  password: Yup.string().required('Password is required').checkLength('Password >= 5 charactor'),
});

export type Register = Yup.InferType<typeof RegisterSchema>;

export type Login = Yup.InferType<typeof LoginSchema>;

// export default Register;

//size schema
export const SizeSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  price: Yup.string().required('Price is required'),
});

export type SizeForm = Yup.InferType<typeof SizeSchema>;

//role schema
export const RoleSchema = Yup.object({
  name: Yup.string().required('Name is required'),
});

export type RoleForm = Yup.InferType<typeof RoleSchema>;
