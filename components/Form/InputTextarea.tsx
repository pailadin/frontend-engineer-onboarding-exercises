import { Textarea, TextareaProps } from '@chakra-ui/react';
import { FC } from 'react';
import Item, { ItemProps } from './_Item';

interface Props extends Omit<ItemProps, 'Component'>, Omit<TextareaProps, 'name'> {}

const FormInputTextarea: FC<Props> = (props) => <Item {...props} Component={Textarea} />;

export default FormInputTextarea;
