import { Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import memo from 'memoize-one';
import { FC, Fragment } from 'react';
import Number from './Number';

interface Props {
  currentPage: number;
  goToPage: (page: number) => number;
  lastPage: number;
}

const getPagesToShow = memo(({ currentPage, lastPage, currentPageBuffer = 0, startEndBuffer = 0 }): Array<number> => {
  const pagesAroundCurrentToShow: Array<number> = [];
  const pagesNearStartEndToShow: Array<number> = [];

  if (currentPageBuffer > 0) {
    for (let i = 1; i <= currentPageBuffer; i++) {
      pagesAroundCurrentToShow.push(currentPage + i);
      pagesAroundCurrentToShow.push(currentPage - i);
    }
  }

  if (startEndBuffer > 0) {
    for (let i = 1; i <= startEndBuffer; i++) {
      pagesNearStartEndToShow.push(1 + i);
      pagesNearStartEndToShow.push(lastPage - i);
    }
  }

  const pagesToShow: Array<number> = Array.from(
    new Set([1, currentPage, lastPage, ...pagesAroundCurrentToShow, ...pagesNearStartEndToShow])
  )
    .filter((x) => x > 0 && x <= lastPage)
    .sort((a, b) => a - b);

  // If just one away from showing all pages, probably best to just show them all
  // as that space is going to have an "..." anyways:
  const areWeMissingJustOnePage = pagesToShow.length >= lastPage - 1;

  return areWeMissingJustOnePage ? Array.from({ length: lastPage }, (_, i) => i + 1) : pagesToShow;
});

// TODO Probably a better/more efficient way to do this:
const NavigationNumbers: FC<Props> = ({
  currentPage,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  goToPage,
  lastPage,
}) => {
  const shouldEvenRender = useBreakpointValue({
    base: false,
    sm: true,
  });

  const currentPageBuffer = useBreakpointValue({
    base: 0,
    md: 1,
  });

  const startEndBuffer = useBreakpointValue({
    base: 0,
    md: 1,
    lg: 2,
  });

  if (!shouldEvenRender) return null;

  const pagesToShow = getPagesToShow({
    currentPage,
    lastPage,
    currentPageBuffer,
    startEndBuffer,
  });

  if (pagesToShow.length <= 1) return null;

  let prevPage;
  return (
    <Flex>
      {pagesToShow.map((page) => {
        if (prevPage && page > prevPage + 1) {
          prevPage = page;
          return (
            <Fragment key={page}>
              <Text alignSelf="center" userSelect="none">
                ...
              </Text>
              <Number page={page} currentPage={currentPage} goToPage={goToPage} />
            </Fragment>
          );
        }

        prevPage = page;
        return <Number key={page} page={page} currentPage={currentPage} goToPage={goToPage} />;
      })}
    </Flex>
  );
};

export default NavigationNumbers;
