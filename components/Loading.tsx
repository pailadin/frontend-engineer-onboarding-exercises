import { Center, Spinner, SpinnerProps } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

interface Props extends SpinnerProps {
  children?: ReactElement;
  loading?: boolean;
}

const Loading: FC<Props> = ({ children, loading = false, ...rest }) => {
  if (!loading && children) return children;

  return (
    <Center>
      <Spinner thickness="4px" emptyColor="gray.200" color="blue.500" size="xl" {...rest} />
    </Center>
  );
};

export default Loading;
