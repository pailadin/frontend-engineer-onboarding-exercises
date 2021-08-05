import { Box, Divider, Grid, Stack, Text, useTheme } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  header?: string;
  [x: string]: unknown;
}

const Container: FC<Props> = ({ children, header, ...rest }) => {
  const theme = useTheme();

  const MIN_WIDTH = {
    base: '100vw',
    md: theme.breakpoints.md,
  };

  return (
    <Box bgColor="white" minWidth={MIN_WIDTH} {...rest}>
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
};

export default Container;
