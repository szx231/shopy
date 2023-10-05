/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from 'next';
import { NewProduct } from 'components/NewProduct';
import { YourProductCard } from 'components/YourProductCard';
import { useEffect, useState } from 'react';
import { CreateNewProduct } from 'components/CreateNewProduct';
import { useGetYourProducts, useDeleteProduct } from 'resources/your-products/yourProducts.api';
import { Pagination } from 'components/Pagination';
import qs from 'qs';
import { useRouter } from 'next/router';
import { convertCentMoneyToInteger } from 'utils/convertCentMoneyToInteger';
import { useStyles } from './styles';

const YourProducts: NextPage = () => {
  const [togglePopUp, setTogglePopUp] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteIdProduct, setDeleteIdProduct] = useState<null | string>(null);
  const { classes } = useStyles();
  const router = useRouter();
  const { mutate: deleteProduct } = useDeleteProduct(deleteIdProduct as string);
  const {
    data: allProducts,
    isSuccess: isSuccessAllProducts,
    isFetching,
    refetch } = useGetYourProducts(currentPage);
  const COUNT_PRODUCTS_ON_PAGE = 17;
  const PAGE_COUNT = Math.ceil(allProducts?.count / COUNT_PRODUCTS_ON_PAGE);

  const togglePopUpCondition = (e) => {
    e.stopPropagation();
    if (e.target.id === 'overlay') {
      return setTogglePopUp(false);
    }

    if (e.currentTarget.id === 'CreateNewProduct') {
      return setTogglePopUp(true);
    }
  };

  useEffect(() => {
    if (deleteIdProduct) {
      deleteProduct();
    }
  }, [deleteIdProduct]);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  useEffect(() => {
    const queryString = qs.stringify({
      page: currentPage,
    });

    router.push(`?${queryString}`);
  }, [currentPage]);

  const changePage = (event: { selected: number }) => {
    const buttonNumber = event.selected + 1;

    setCurrentPage(buttonNumber);
  };

  useEffect(() => {
    setTogglePopUp(false);
  }, [isFetching]);

  useEffect(() => {
    if (togglePopUp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [togglePopUp]);

  useEffect(() => {
    document.addEventListener('click', (e) => togglePopUpCondition(e));
    return () => {
      document.removeEventListener('click', togglePopUpCondition);
    };
  }, []);

  const existProducts = allProducts?.results?.length;
  const productsSize = allProducts?.count > 17;

  const deleteCurrentProduct = (id: string) => setDeleteIdProduct(id);

  return (
    <>
      {togglePopUp && (
        <div className={classes.overlay}>
          <div id="overlay" className={classes.overlayContent}>
            <CreateNewProduct />
          </div>
        </div>
      )}
      {isSuccessAllProducts && (
        <div className={classes.container}>
          {allProducts?.count !== 0 && (
            <div className={classes.productsList}>
              <NewProduct togglePopUpCondition={togglePopUpCondition} />
              {allProducts?.results?.map(({ imageLink, status, name, price, _id }) => (
                <YourProductCard
                  img={imageLink}
                  productStatus={status as 'On sale' | 'Sold'}
                  name={name}
                  cost={convertCentMoneyToInteger(+price)}
                  id={_id}
                  deleteProduct={deleteCurrentProduct}
                />
              ))}
            </div>
          )}
          {!existProducts && <CreateNewProduct />}
          {productsSize
          && (
          <Pagination
            handlePageClick={changePage}
            pageCount={PAGE_COUNT}
            currentPage={0}
          />
          )}
        </div>
      )}
    </>
  );
};

export default YourProducts;
