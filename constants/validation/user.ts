import * as yup from 'yup';

const name = yup.string().min(2).max(50).required();
const firstName = name.label('First name');
const lastName = name.label('Last name');

const email = yup.string().email().label('Email').required();

const password = yup.string().label('Password').required();
const password2 = yup
  .string()
  .required()
  .label('Confirm password')
  .oneOf([yup.ref('password')], 'Passwords must match');

export const LOGIN = { email, password };

export const REGISTER = { firstName, lastName, email, password, password2 };
