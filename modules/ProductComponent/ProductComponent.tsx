import { useQuery } from '@apollo/client';
import { Flex, HStack, Icon, IconButton, Image, Text, useToast } from '@chakra-ui/react';
import AddToCartButton from '@components/AddToCartButton';
import Loading from '@components/Loading';
import Redirect from '@components/Redirect';
import { DEFAULT_PRODUCT_IMAGE } from '@constants/etc';
import { GET_PRODUCTS, GET_PRODUCTS_AND_USER } from '@constants/graphql/queries';
import { checkIfLoggedIn } from '@store/userSlice';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import { FaEdit as IconEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Container from './Container';
import DeleteIconButton from './DeleteIconButton';

interface Props {
  id: string;
}

const Product: FC<Props> = ({ id }) => {
  const toast = useToast();
  const isLoggedIn = useSelector(checkIfLoggedIn);

  const { loading, error, data } = useQuery(isLoggedIn ? GET_PRODUCTS_AND_USER : GET_PRODUCTS, {
    variables: {
      filter: {
        id: {
          eq: id,
        },
      },
    },
  });

  const userId = data?.me?.id || null;
  const product = data?.products?.edges?.[0]?.node;
  const ownerUserId = product?.owner?.id;
  const isCurrentUserOwner = userId === ownerUserId; // afaik, no way to just do this in filter
  const shouldShowError = !loading && (error || !product);

  useEffect(() => {
    if (shouldShowError) {
      // Toasting this here instead of using "onError" cuz
      // a search not returning a result doesn't actually error:
      toast({
        title: 'Error!',
        description: 'Product not found',
        status: 'error',
        isClosable: true,
      });
    }
  }, [shouldShowError, toast]);

  if (shouldShowError) return <Redirect />;
  if (loading) return <Loading />;

  return (
    <Container
      bgColor="inherit"
      breadcrumbs={product.name}
      renderLeft={
        <>
          <Image
            src={product.image}
            fallbackSrc={DEFAULT_PRODUCT_IMAGE}
            rounded="xl"
            objectFit="contain"
            height="auto"
          />

          <AddToCartButton mt={6} />
        </>
      }
    >
      <Flex justifyContent="space-between">
        <Text fontSize="3xl" fontWeight="bold" isTruncated>
          {product.name}
        </Text>

        {isCurrentUserOwner && (
          <HStack spacing={2}>
            <Link href={`/product/edit/${id}`}>
              <IconButton colorScheme="gray" icon={<Icon as={IconEdit} h={3} w={3} />} aria-label="Edit Button" />
            </Link>

            <DeleteIconButton id={product.id} />
          </HStack>
        )}
      </Flex>

      <Flex mt={4}>
        <Text whiteSpace="pre-wrap">{product.description}</Text>
      </Flex>
    </Container>
  );
};

export default Product;
