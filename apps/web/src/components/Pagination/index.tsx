import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import Image from 'next/image';
import { useStyles } from './styles';

interface PaginationProps {
  handlePageClick: (event: { selected: number }) => void;
  pageCount: number;
  currentPage: number;
}

export const Pagination: FC<PaginationProps> = (props) => {
  const { classes } = useStyles();
  const { handlePageClick, pageCount, currentPage } = props;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<Image width={16} height={16} alt="arrow" src="../images/arrowLeft.svg" />}
      onPageChange={handlePageClick}
      pageRangeDisplaayed={5}
      pageCount={pageCount}
      previousLabel={
        <Image style={{ rotate: '180deg' }} width={16} height={16} alt="arrow" src="../images/arrowLeft.svg" />
      }
      renderOnZeroPageCount={null}
      containerClassName={classes.pagination}
      previousLinkClassName=""
      nextLinkClassName="pagination__link"
      disabledClassName={classes.paginationLinkDisabled}
      activeClassName={classes.paginationLinkActive}
      forcePage={currentPage}
    />
  );
};
