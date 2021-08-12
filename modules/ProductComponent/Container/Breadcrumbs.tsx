import { HStack, Icon, Text } from '@chakra-ui/react';
import Link from '@components/LinkOptional';
import { FC, Fragment } from 'react';
import { FaGreaterThan as IconArrow } from 'react-icons/fa';

const TEXT_COLOR = 'gray.400';

export type BreadcrumbType = {
  label: string;
  href?: string;
};

export interface BreadcrumbsProps {
  breadcrumbs?: string | (string | BreadcrumbType)[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbs: breadcrumbsProp = [] }) => {
  const breadcrumbs = typeof breadcrumbsProp === 'string' ? [breadcrumbsProp] : breadcrumbsProp;

  if (breadcrumbs.length <= 0) return null;

  const lastBreadcrumbIndex = breadcrumbs.length - 1;

  return (
    <HStack>
      {breadcrumbs.map((breadcrumb, i) => {
        const { label, href } = typeof breadcrumb === 'string' ? { label: breadcrumb, href: null } : breadcrumb;

        return (
          <Fragment key={i}>
            <Link href={href}>
              <Text fontSize="sm" color={TEXT_COLOR} cursor={href ? 'pointer' : 'default'}>
                {label}
              </Text>
            </Link>

            {i < lastBreadcrumbIndex && <Icon color={TEXT_COLOR} as={IconArrow} w={2} h={2} />}
          </Fragment>
        );
      })}
    </HStack>
  );
};

export default Breadcrumbs;
