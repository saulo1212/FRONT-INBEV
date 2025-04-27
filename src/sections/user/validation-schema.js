import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string().required('O campo nome e obrigatório.'),
  userLogin: Yup.string().required('O campo login e obrigatório'),
  email: Yup.string().required('O campo email e obrigatório.'),
  password: Yup.string().required('O campo senha e obrigatório.'),
  active: Yup.boolean().optional(),
});

export const schemaUpdate = Yup.object().shape({
  name: Yup.string().required('O campo nome e obrigatório.'),
  userLogin: Yup.string().required('O campo login e obrigatório'),
  email: Yup.string().required('O campo email e obrigatório.'),
  active: Yup.boolean().optional(),
});
