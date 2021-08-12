import { Flex } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import Breadcrumbs, { BreadcrumbsProps, BreadcrumbType } from './Breadcrumbs';

const INITIAL_BREADCRUMBS: (string | BreadcrumbType)[] = [
  {
    label: 'Products',
    href: '/products',
  },
];

interface Props extends BreadcrumbsProps {
  children: ReactNode;
  renderLeft?: ReactNode;
  bgColor?: string;
  [x: string]: unknown;
}

const ProductContainer: FC<Props> = ({ children, renderLeft, breadcrumbs, bgColor = 'white', ...rest }) => (
  <Flex
    width="100%"
    direction="column"
    mt={{
      base: 0,
      sm: 8,
      md: 16,
      lg: 24,
    }}
    {...rest}
  >
    {breadcrumbs && (
      <Flex mb={6}>
        <Breadcrumbs breadcrumbs={INITIAL_BREADCRUMBS.concat(breadcrumbs)} />
      </Flex>
    )}

    <Flex bgColor={bgColor}>
      {renderLeft && (
        <Flex
          display={{ base: 'none', md: 'flex' }}
          flexDirection="column"
          flexShrink={0}
          flexGrow={0}
          flexBasis={{
            base: 0,
            sm: '30%',
            lg: '40%',
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

export default ProductContainer;
