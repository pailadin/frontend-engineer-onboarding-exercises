import { Box, Divider, Grid, Stack, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  header?: string;
  rest?: unknown;
}

const Container: FC<Props> = ({ children, header, ...rest }) => (
  <Box bgColor="white" w="40vw" {...rest}>
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

export default Container;
