import { Box, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import {
  FaFacebook as IconFacebook,
  FaGithub as IconGithub,
  FaInstagram as IconInstagram,
  // TODO Ask what the icon in the Figma is
  FaQuestionCircle as IconUnknown,
  FaTwitter as IconTwitter,
} from 'react-icons/fa';
import Container from '../Container';
import Stack from '../Stack';
import Icon from './Icon';

const LayoutFooter: FC = () => {
  return (
    <Container>
      <Box>
        <Text color="gray.400" fontSize="sm">
          @2020 HOV Onboarding, All rights reserved
        </Text>
      </Box>

      <Stack spacing={6}>
        <Icon as={IconFacebook} href="https://www.facebook.com" />
        <Icon as={IconInstagram} href="https://www.instagram.com" />
        <Icon as={IconTwitter} href="https://www.twitter.com" />
        <Icon as={IconGithub} href="https://www.github.com" />
        <Icon as={IconUnknown} href="https://www.example.com" />
      </Stack>
    </Container>
  );
};

export default LayoutFooter;
