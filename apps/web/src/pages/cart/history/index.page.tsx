import { NextPage } from 'next';
import { useGetOrder } from 'resources/order/order.api';
import { Image } from '@mantine/core';
import { PaymentResult } from 'components/PaymentResult';
import { convertCentMoneyToInteger } from 'utils/convertCentMoneyToInteger';
import config from 'config';
import { useStyles } from './styles';

const History: NextPage = () => {
  const { data: order, isSuccess: isSuccesOrder } = useGetOrder(1);
  const { classes } = useStyles();

  const convertDate = (date: string): string => {
    const correctDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const normalDate = correctDate.toLocaleDateString('ru-RU', options).replace(/\//g, '.');

    return normalDate;
  };

  if (order?.results?.length === 0) {
    return <PaymentResult condition="nothing" />;
  }

  return (
    <div>
      {isSuccesOrder && (
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr>
              <th className={classes.theadTd}>Item</th>
              <th className={classes.theadTd}>Unit Price</th>
              <th className={classes.theadTd}>Date</th>
            </tr>
          </thead>
          <tbody className={classes.tbody}>
            {order?.results?.map(({ _id, name, price, imageLink, orderTime }) => (
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
                <td className={classes.textAlignRight}>
                  <div className={classes.date}>{convertDate(orderTime)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
