import { NextPage } from 'next';
import { useChangeProductBasketQuantity, useDeleteProductInBasket, useGetBasket } from 'resources/basket/basket.api';
import { Image } from '@mantine/core';
import { PaymentResult } from 'components/PaymentResult';
import { convertCentMoneyToInteger } from 'utils/convertCentMoneyToInteger';
import config from 'config';
import { useStyles } from './styles';

const MyCart: NextPage = () => {
  const { classes } = useStyles();
  const {
    data: basket,
    isSuccess: isSuccessBasket,
    isError: isBusscketError,
    isFetching: isFetchingBasket,
  } = useGetBasket(1);

  const { mutate: mutateProductQuantity } = useChangeProductBasketQuantity();
  const { mutate: mutateBasket } = useDeleteProductInBasket();

  const changeQuantity = (
    e: React.MouseEvent<HTMLButtonElement>,
    quantity:number,
    productID:string,
  ) => {
    if (e.currentTarget.id === 'minus') {
      const newValue = quantity - 1;
      if (newValue >= 1) {
        return mutateProductQuantity({ productID, newValue });
      }
    }

    if (e.currentTarget.id === 'plus') {
      const newValue = quantity + 1;
      mutateProductQuantity({ productID, newValue });
    }
  };

  if (isBusscketError) {
    return <div>oops something wrong</div>;
  }

  if (isFetchingBasket) {
    return <div>loading</div>;
  }

  if (basket?.results?.length === 0) {
    return <PaymentResult condition="nothing" />;
  }

  return (
    <div>
      {isSuccessBasket && (
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr>
              <th className={classes.theadTd}>Item</th>
              <th className={classes.theadTd}>Unit Price</th>
              <th className={classes.theadTd}>Quantity</th>
              <th className={classes.theadTd} aria-label="Empty header" />
            </tr>
          </thead>
          <tbody className={classes.tbody}>
            {basket?.results?.map(({ _id, name, price, imageLink, quantity }) => (
              <tr key={_id}>
                <td>
                  <div className={classes.descriptionWrapper}>
                    <Image
                      fit="contain"
                      className={classes.imageProduct}
                      width={80}
                      height={80}
                      src={`${config.API_URL}/${imageLink}`}
                      alt="item's image"
                    />
                    <div className={classes.name}>{name}</div>
                  </div>
                </td>
                <td className={classes.textAlignRight}>
                  <div className={classes.price}>{`$${convertCentMoneyToInteger(price)}`}</div>
                </td>
                <td>
                  <div className={classes.quantityWrapper}>
                    <button
                      onClick={(e) => changeQuantity(e, quantity, _id)}
                      className={classes.resetButton}
                      type="button"
                      id="minus"
                    >
                      <Image width={24} height={24} src="../images/minusTable.svg" alt="minus icon" />
                    </button>
                    {quantity}
                    <button
                      id="plus"
                      onClick={(e) => changeQuantity(e, quantity, _id)}
                      className={classes.resetButton}
                      type="button"
                    >
                      <Image width={24} height={24} src="../images/plusTable.svg" alt="plus icon" />
                    </button>
                  </div>
                </td>
                <td className={classes.textAlignRight}>
                  <div className={classes.removeContainer}>
                    <button className={classes.removeButton} onClick={() => mutateBasket(_id)} type="button">
                      <Image width={24} height={24} src="../images/cross.svg" alt="cross icon" />
                    </button>
                    <div>Remove</div>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyCart;
