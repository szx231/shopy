import React, { FC } from 'react';
import Image from 'next/image';
import config from 'config';
import { useStyles } from './styles';

interface IYourProductCard {
  img: string;
  productStatus: 'On sale' | 'Sold';
  name: string;
  cost: number;
  id: string;
  deleteProduct: (id: string) => void;
}

export const YourProductCard: FC<IYourProductCard> = (
  { img,
    productStatus,
    name,
    cost,
    id,
    deleteProduct },
) => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.imgWrapper}>
        <img className={classes.img} alt="itemsImage" src={`${config.API_URL}/${img}`} />
        <div className={productStatus === 'On sale' ? classes.orangeStatus : classes.greenStatus}>{productStatus}</div>
        <button type="button" onClick={() => deleteProduct(id)} className={classes.trashWrapper}>
          <Image width={24} height={24} src="../images/trash.svg" alt="delete item icon" />
        </button>
      </div>
      <div className={classes.descriptionWrapper}>
        <h3 className={classes.name}>{name}</h3>
        <div className={classes.priceContainer}>
          <div className={classes.price}>Price:</div>
          <div className={classes.cost}>{`${cost} $`}</div>
        </div>
      </div>
    </div>
  );
};
