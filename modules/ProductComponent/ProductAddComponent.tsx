import { Flex, Text } from '@chakra-ui/react';
import FileUploadBox from '@components/FileUploadBox';
import { Item } from '@components/Form';
import { PRODUCT_ADD } from '@constants/graphql/mutations';
import { CREATE as VALIDATION_SCHEMA } from '@constants/validation/product';
import { FC } from 'react';
import ProductAddUpdate from './ProductAddUpdate';

const ProductAdd: FC = () => (
  <ProductAddUpdate
    mutation={PRODUCT_ADD}
    dataPath="createProduct"
    successTitleSuffix="created"
    successDescription="Redirecting to your new product..."
    validationSchema={VALIDATION_SCHEMA}
    breadcrumbs="Add product"
    renderLeft={
      <Flex p={4} flex={1} direction="column">
        <Text mb={4}>Photo</Text>

        <FileUploadBox />
      </Flex>
    }
  >
    <Item name="name" label="Title" />

    <Item name="description" multiline={true} />
  </ProductAddUpdate>
);

export default ProductAdd;
