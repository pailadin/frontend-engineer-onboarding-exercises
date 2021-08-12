import { Input, InputProps } from '@chakra-ui/react';
import { FC } from 'react';
import Item, { ItemProps } from './_Item';

interface Props extends Omit<ItemProps, 'Component'>, Omit<InputProps, 'name'> {}

const FormInput: FC<Props> = (props) => <Item {...props} Component={Input} />;

export default FormInput;
