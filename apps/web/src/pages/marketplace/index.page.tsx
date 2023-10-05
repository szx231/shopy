/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from 'next';
import { Search } from 'components/Search';
import { Filters } from 'components/Filters';
import { SortButton } from 'components/SortButton';
import { SortRangeLabel } from 'components/SortRangeLabel';
import { ProductCard } from 'components/ProductCard';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import qs from 'qs';
import { useRouter } from 'next/router';
import { Pagination } from 'components/Pagination';
import { filtersChangeValue, clearPriceRange, resetAll } from 'store/Filters';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useToggleProductInBasket } from 'resources/basket/basket.api';
import { useGetMarketplaceProducts } from 'resources/marketplace/marketplace.api';
import { convertCentMoneyToInteger } from 'utils/convertCentMoneyToInteger';
import { useStyles } from './styles';

interface QueryParams {
  sortBy?: string;
  fromPrice?: number;
  toPrice?: number;
  searchValue?: string;
  page?: number;
}

const MarketPlace: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [resetClicked, setResetClicked] = useState(false);
  const [allReset, setAllReset] = useState(false);
  const {
    searchValue,
    fromPrice,
    toPrice,
    sortBy,
    page,
  } = useAppSelector((state) => state.Filters);
  const filtersStore = { searchValue, fromPrice, toPrice, sortBy, page };
  const [isStoreUpdated, setIsStoreUpdated] = useState(false);
  const {
    data: products,
    isSuccess: isSuccessAllProducts,
    isFetching: isFetchingProducts,
    refetch,
    isError: isErrorFetchProducts,
  } = useGetMarketplaceProducts(filtersStore, currentPage, isStoreUpdated, {});
  const { mutate: toggleProduct } = useToggleProductInBasket();

  const ITEMS_ON_PAGE = 17;

  const showPagination = ITEMS_ON_PAGE < products?.count;

  const { classes } = useStyles();
  const router = useRouter();

  const { asPath } = router;

  const queryString = asPath.split('?')[1];

  const dispatch = useAppDispatch();

  const [showLabel, setShowLabel] = useState(false);
  const PAGE_COUNT = Math.ceil(products?.count! / ITEMS_ON_PAGE);

  const handleShowLabel = () => {
    if (fromPrice || toPrice) {
      setShowLabel(true);
    }
  };

  const addQueryParamsToSearchString = () => {
    const queryParams: QueryParams = {};

    if (sortBy) {
      queryParams.sortBy = sortBy;
    }

    if (fromPrice) {
      queryParams.fromPrice = fromPrice;
    }

    if (toPrice) {
      queryParams.toPrice = toPrice;
    }

    if (searchValue) {
      queryParams.searchValue = searchValue;
    }

    if (page) {
      queryParams.page = page;
    }

    const queryParamsString = qs.stringify(queryParams);

    router.push(`?${queryParamsString}`);
  };

  const findProducts = () => {
    addQueryParamsToSearchString();
    handleShowLabel();
    refetch();
  };

  const resetPriceRangeHandle = () => {
    dispatch(clearPriceRange());
    setResetClicked(true);
  };

  const resetAllHandler = () => {
    dispatch(resetAll());
    setAllReset(true);
  };

  const changePage = (event: { selected: number }) => {
    const buttonNumber = event.selected + 1;

    setCurrentPage(buttonNumber);
  };

  useLayoutEffect(() => {
    const queryParams = qs.parse(queryString);

    Object.entries(queryParams).forEach(([key, value]: [string, unknown]) => {
      if (typeof value === 'string') {
        dispatch(filtersChangeValue({ key: key as 'searchValue' | 'fromPrice' | 'toPrice' | 'sortBy' | 'page', value }));
      }
    });

    setIsStoreUpdated(true);
  }, []);

  useEffect(() => {
    if (isStoreUpdated) {
      refetch();
    }
  }, [currentPage, isStoreUpdated]);

  useEffect(() => {
    if (isStoreUpdated && (fromPrice || toPrice)) {
      setShowLabel(true);
    }
  }, [isStoreUpdated]);

  useEffect(() => {
    if (isStoreUpdated && !fromPrice && !toPrice) {
      setShowLabel(false);
    }
  }, [isStoreUpdated, fromPrice, toPrice]);

  useEffect(() => {
    if (resetClicked) {
      addQueryParamsToSearchString();
      refetch();
      setResetClicked(false);
    }
  }, [resetClicked]);

  useEffect(() => {
    if (allReset) {
      addQueryParamsToSearchString();
      refetch();
      setAllReset(false);
    }
  }, [allReset]);

  if (isErrorFetchProducts) {
    return <div>error</div>;
  }

  if (isFetchingProducts) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div className={classes.container}>
        {isSuccessAllProducts && (
        <>
          {products.count !== 0 && <Filters resetAllHandler={resetAllHandler} />}
          <div className={classes.products}>
            <Search findProducts={findProducts} />
            {products.count === 0 && <div>Nothing found</div>}
            {products.count !== 0 && (
              <>
                <div className={classes.sortContainer}>
                  <div>
                    {products?.count && <div className={classes.countItems}>{`${products?.count} results`}</div>}
                    {showLabel && isStoreUpdated && (
                    <SortRangeLabel
                      resetPriceRange={resetPriceRangeHandle}
                      fromPrice={fromPrice}
                      toPrice={toPrice}
                    />
                    )}
                  </div>
                  <div>
                    <SortButton />
                  </div>
                </div>
                <div style={{justifyContent: PAGE_COUNT === currentPage ? 'start' : 'space-between'}} className={classes.productsList}>
                  {products?.results?.map(({ imageLink, inBasket, name, price, _id }) => (
                    <ProductCard
                      toggleFn={toggleProduct}
                      id={_id}
                      img={imageLink}
                      productInBasket={inBasket}
                      name={name}
                      cost={convertCentMoneyToInteger(price)}
                    />
                  ))}
                </div>
                {showPagination && (
                <Pagination
                  pageCount={PAGE_COUNT}
                  currentPage={currentPage - 1}
                  handlePageClick={changePage}
                />
                )}
              </>
            )}
          </div>
        </>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
