import { Center, Text } from '@chakra-ui/react';
import Loading from '@components/Loading';
import { GET_CURRENT_USER } from '@constants/graphql/queries';
import { checkIfLoggedIn } from '@store/userSlice';
import { useQuery } from '@utils/api';
import { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';

export type UserIdProps = {
  userId: string | null;
};

interface Props {
  render: (UserIdProps: UserIdProps) => ReactElement;
  dontShowLoading?: boolean;
}

const UserId: FC<Props> = ({ render, dontShowLoading = false }) => {
  const isLoggedIn = useSelector(checkIfLoggedIn);

  const { loading, inCache, error, data } = useQuery(GET_CURRENT_USER, {
    skip: !isLoggedIn,
  });

  const userId = data?.me?.id || null;

  if (isLoggedIn && !dontShowLoading && loading && !inCache) {
    return <Loading />;
  }

  // TODO Handle error properly
  if (error) {
    return (
      <Center>
        <Text>An error while loading user data</Text>
      </Center>
    );
  }

  return render({ userId });
};

export default UserId;
