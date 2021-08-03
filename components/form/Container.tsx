import { Box, Divider, Grid, Stack, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  header?: string;
  bgColor?: string;
  w?: string;
  h?: string;
}

const FormContainer: FC<Props> = ({ children, header, bgColor = 'white', w = '50vw', h }) => (
  <Box bgColor={bgColor} w={w} h={h}>
    {header && (
      <>
        <Grid p={4} placeContent="center">
          <Text fontSize="3xl" fontWeight="bold">
            {header}
          </Text>
        </Grid>

        <Divider />
      </>
    )}

    <Grid p={6}>
      <Stack spacing={6}>{children}</Stack>
    </Grid>
  </Box>
);

export default FormContainer;
