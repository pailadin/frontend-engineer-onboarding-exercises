import { Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { FC, Fragment } from 'react';
import Number from './Number';

interface Props {
  currentPage: number;
  goToPage: (page: number) => number;
  lastPage: number;
}

// TODO Probably a better/more efficient way to do this:
const NavigationNumbers: FC<Props> = ({
  currentPage,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  goToPage,
  lastPage,
}) => {
  const numberOfPagesAroundCurrentToShow = useBreakpointValue({
    base: undefined,
    sm: 0,
    md: 1,
    lg: 2,
  });

  // undefined is special, means don't output anything at all
  if (numberOfPagesAroundCurrentToShow === undefined) return null;

  let pagesToShowLeft: number[] = [];
  let pagesToShowRight: number[] = [];

  if (numberOfPagesAroundCurrentToShow > 0) {
    pagesToShowLeft = Array.from(
      {
        length: numberOfPagesAroundCurrentToShow,
      },
      (_, i) => currentPage - i - 1
    ).reverse();

    pagesToShowRight = Array.from(
      {
        length: numberOfPagesAroundCurrentToShow,
      },
      (_, i) => currentPage + 1 + i
    );
  }

  const pagesToShow = Array.from(
    new Set([1, 2, ...pagesToShowLeft, currentPage, ...pagesToShowRight, lastPage - 1, lastPage])
  )
    .filter((x) => x > 0 && x <= lastPage)
    // Should already be sorted, but just in case:
    .sort((a, b) => a - b);

  let prevPage;
  return (
    <Flex>
      {pagesToShow.map((page) => {
        if (prevPage && page > prevPage + 1) {
          prevPage = page;
          return (
            <Fragment key={page}>
              <Text>...</Text>
              <Number page={page} currentPage={currentPage} />
            </Fragment>
          );
        }

        prevPage = page;
        return <Number key={page} page={page} currentPage={currentPage} />;
      })}
    </Flex>
  );
};

export default NavigationNumbers;
