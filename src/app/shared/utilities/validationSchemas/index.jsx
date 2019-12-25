import * as Yup from 'yup';

const sendGiftSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name should be more than 2 characters.')
        .max(50, 'Name cannot be more than 50 characters.')
        .required('Required'),
    personalMessage: Yup.string()
        .min(2, 'Message should be atleast 2 characters.')
        .max(100, 'Too Long!'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
});

const reviewFormSchema = Yup.object().shape({
    rating: Yup.number()
        .required('Required'),
    comment: Yup.string()
        .min(2, 'Message should be atleast 2 characters.')
        .max(100, 'Too Long!')
        .required('Required'),
});

export { sendGiftSchema, reviewFormSchema };