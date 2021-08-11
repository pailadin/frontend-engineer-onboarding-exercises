import * as yup from 'yup';

const name = yup.string().min(1).max(50);
const description = yup.string().min(1);

export const CREATE = {
  name: name.required(),
  description: description.required(),
};

// Currently the same, just in case
export const EDIT = {
  name: name.required(),
  description: description.required(),
};
