import Image from 'next/image';
import { FC } from 'react';
import { useStyles } from './styles';

interface NewProductProps {
  togglePopUpCondition: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const NewProduct:FC<NewProductProps> = ({ togglePopUpCondition }) => {
  const { classes } = useStyles();

  return (
    <button id="CreateNewProduct" onClick={togglePopUpCondition} type="button" className={classes.container}>
      <button type="button" className={classes.content}>
        <Image className={classes.img} src="../images/plus.svg" alt="plus icon" width={40} height={40} />
        <div className={classes.text}>New Product</div>
      </button>
    </button>
  );
};
