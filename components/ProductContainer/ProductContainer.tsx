import { Flex } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import Breadcrumbs from './Breadcrumbs';

interface Props {
  children: ReactNode;
  renderLeft?: ReactNode;
  breadcrumbs?: string | Array<string>;
}

const ProductContainer: FC<Props> = ({ children, renderLeft, breadcrumbs: breadcrumbsProp }) => {
  const breadcrumbs = breadcrumbsProp ? Array.from(new Set(['Products'].concat(breadcrumbsProp))) : null;

  return (
    <Flex
      width="100%"
      direction="column"
      mt={{
        base: 0,
        sm: 8,
        md: 16,
        lg: 24,
      }}
    >
      {breadcrumbs && (
        <Flex mb={6}>
          <Breadcrumbs strings={Array.from(new Set(['Products'].concat(breadcrumbs)))} />
        </Flex>
      )}

      <Flex flexGrow={1}>
        {renderLeft && (
          <Flex
            display={{ base: 'none', md: 'flex' }}
            flexDirection="column"
            width={{
              base: 0,
              sm: 8 * 20,
              md: 8 * 40,
              lg: 8 * 50,
              xl: 8 * 60,
            }}
          >
            {renderLeft}
          </Flex>
        )}

        <Flex pl={4} flexGrow={1} flexDirection="column">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductContainer;
