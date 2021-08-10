import { Center, Spinner } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

interface Props {
  children?: ReactElement;
  loading?: boolean;
  [x: string]: unknown;
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
