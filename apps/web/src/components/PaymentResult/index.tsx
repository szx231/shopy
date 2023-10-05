import { Button, Image } from '@mantine/core';
import { FC } from 'react';
import Link from 'next/link';
import { useStyles } from './styles';

type PaymentResultProps = {
  condition: 'success' | 'reject' | 'nothing';
};

export const PaymentResult: FC<PaymentResultProps> = ({ condition }) => {
  const { classes } = useStyles();

  const objData = {
    success: {
      image: '../images/successPayment.svg',
      title: 'Payment Successfull',
      description: 'Hooray, you have completed your payment!',
      buttonText: 'Back to Cart',
      buttonHref: '/cart/my-cart',
      imageSize: 56,
    },
    reject: {
      image: '../images/rejectPayment.svg',
      title: 'Payment Failed',
      description: 'Sorry, your payment failed. Would you like to try again?',
      buttonText: 'Back to Cart',
      buttonHref: '/cart/my-cart',
      imageSize: 56,
    },
    nothing: {
      image: '../images/balloon.svg',
      title: "Oops, there's nothing here yet!",
      description: "You haven't made any purchases yet. Go to the marketplace and make purchases.",
      buttonText: 'Go to Marketplace',
      buttonHref: '/marketplace',
      imageSize: 206,
    },
  };

  return (
    <div className={classes.container}>
      <Image
        width={objData[condition].imageSize}
        height={objData[condition].imageSize}
        src={objData[condition].image}
        alt="successPayment image"
      />
      <h3 className={classes.title}>{objData[condition].title}</h3>
      <h4 className={classes.description}>{objData[condition].description}</h4>
      <Link href={objData[condition].buttonHref}>
        <Button size="md" radius="md">
          {objData[condition].buttonText}
        </Button>
      </Link>
    </div>
  );
};
