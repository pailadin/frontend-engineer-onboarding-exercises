import { Icon, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  onClick: () => number;
  disabled?: boolean;
  showIconFirst?: boolean;
}

const NavigationArrow: FC<Props> = ({ text, icon, onClick, disabled = false, showIconFirst = false }) => {
  return (
    <Stack
      onClick={disabled ? undefined : onClick}
      cursor={disabled ? 'default' : 'pointer'}
      color={disabled ? 'gray.400' : 'black'}
      direction={showIconFirst ? 'row' : 'row-reverse'}
      alignItems="center"
      userSelect="none"
      pt={4}
      pb={4}
    >
      <Icon as={icon} />
      <Text>{text}</Text>
    </Stack>
  );
};

export default NavigationArrow;
