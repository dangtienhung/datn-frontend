import Yup from './global';

export const RegisterSchema = Yup.object({
  account: Yup.string()
    .required('Account is required')
    // .regexEmail('Email is not valid')
    .regexMatch('Email or Phone is not valid'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required').checkLength('Password >= 5 charactor'),
  confirmpassword: Yup.string()
    .required('ConfirmPassword is required')
    .oneOf([Yup.ref('password')], 'ConfirmPassword is not valid'),
});

type Register = Yup.InferType<typeof RegisterSchema>;

export default Register;
