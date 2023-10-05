import { useMemo, FC } from 'react';
import config from 'config';
import { useStyles } from './styles';

interface ProductCardProps {
  img: string,
  productInBasket: boolean,
  name: string,
  cost: number,
  toggleFn: (id: string) => void,
  id: string,
}

export const ProductCard:FC<ProductCardProps> = (
  { img,
    productInBasket,
    name,
    cost,
    toggleFn,
    id },
) => {
  const { classes } = useStyles();
  const buttonText = useMemo(() => (productInBasket ? 'In Cart' : 'Add to Cart'), [productInBasket]);
  const buttonColor = productInBasket ? '#72A5F4' : '#2B77EB';

  return (
    <div className={classes.container}>
      <img className={classes.img} alt="itemsImage" src={`${config.API_URL}/${img}`} />
      <div className={classes.descriptionWrapper}>
        <h3 className={classes.name}>{name}</h3>
        <div className={classes.priceContainer}>
          <div className={classes.price}>Price:</div>
          <div className={classes.cost}>{`${cost}$`}</div>
        </div>
        <button
          onClick={() => toggleFn(id)}
          style={{ backgroundColor: buttonColor }}
          type="button"
          className={classes.defaultButton}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
