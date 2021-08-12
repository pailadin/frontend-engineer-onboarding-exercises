import { Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { DEFAULT_PRODUCT_IMAGE } from '@constants/etc';
import { FC } from 'react';
import { FaImages as IconImage } from 'react-icons/fa';

interface Props {
  image?: string;
  hasImage?: boolean;
}

const FileUploadBox: FC<Props> = ({ image = DEFAULT_PRODUCT_IMAGE, hasImage = false }) => {
  const background = hasImage
    ? `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${image}')`
    : undefined;
  const uploadTextBgColor = hasImage ? 'pink.50' : 'inherit';
  const uploadTextPaddingHorizontal = hasImage ? 1 : 0;
  const primaryTextColor = hasImage ? 'pink.50' : 'black';
  const iconAndSecondaryTextColor = hasImage ? 'pink.50' : 'gray.400';

  return (
    <Flex
      flex={1}
      flexDirection="column"
      justifyContent="center"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="gray.200"
      p="2px"
    >
      <Flex
        flex={1}
        id="fileuploadbox"
        flexDirection="column"
        justifyContent="center"
        backgroundImage={hasImage ? image : undefined}
        background={background}
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundSize="cover"
      >
        <Flex justifyContent="center">
          <VStack>
            <Icon as={IconImage} color={iconAndSecondaryTextColor} h={10} w={10} />

            <HStack direction="row" spacing={0}>
              <Text
                color="purple.700"
                bgColor={uploadTextBgColor}
                rounded="md"
                pl={uploadTextPaddingHorizontal}
                pr={uploadTextPaddingHorizontal}
                fontSize="sm"
                fontWeight="semibold"
              >
                Upload a file
              </Text>

              <Text color={primaryTextColor} fontSize="sm" fontWeight="semibold">
                &nbsp;or drag and drop
              </Text>
            </HStack>

            <Text color={iconAndSecondaryTextColor} fontSize="xs">
              PNG, JPG, GIF up to 10MB
            </Text>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FileUploadBox;
