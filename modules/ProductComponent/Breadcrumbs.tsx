import { HStack, Icon, Text } from '@chakra-ui/react';
import { FC, Fragment } from 'react';
import { FaGreaterThan as IconArrow } from 'react-icons/fa';

const TEXT_COLOR = 'gray.400';

interface Props {
  strings?: Array<string>;
}

const Breadcrumbs: FC<Props> = ({ strings = [] }) => (
  <HStack>
    {strings.map((string, i) => (
      <Fragment key={i}>
        <Text fontSize="sm" color={TEXT_COLOR}>
          {string}
        </Text>

        {i < strings.length - 1 && <Icon color={TEXT_COLOR} as={IconArrow} w={2} h={2} />}
      </Fragment>
    ))}
  </HStack>
);

export default Breadcrumbs;
