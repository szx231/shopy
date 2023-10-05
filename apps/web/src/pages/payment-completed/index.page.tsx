import { PaymentResult } from 'components/PaymentResult';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Confetti from 'react-confetti';
import { useCheckPayment } from 'resources/payment-completd/payment-completed.api';

const PaymentCompleted: NextPage = () => {
  const {
    mutate: checkPaymentStatus,
    isSuccess: isSuccessCheckPayment,
    isError: isErrorCheckPayment,
  } = useCheckPayment();

  const screenWidth = window.innerWidth || document.documentElement.clientWidth
  || document.body.clientWidth;
  const screenHeight = window.innerHeight || document.documentElement.clientHeight
  || document.body.clientHeight;
  const router = useRouter();
  const { query } = router;
  const sessionID = query.session;

  useEffect(() => {
    if (sessionID) {
      checkPaymentStatus({ sessionID });
    }
  }, [checkPaymentStatus, sessionID]);

  const paymentCondition = Object.keys(query)[0] === 'success' ? 'success' : 'reject';

  return (
    <>
      {isErrorCheckPayment && <div>Oops something wrong</div>}
      {isSuccessCheckPayment && (
        <>
          <PaymentResult condition={paymentCondition} />
          {paymentCondition !== 'reject' && <Confetti width={screenWidth} height={screenHeight} recycle={false} />}
        </>
      )}
    </>
  );
};

export default PaymentCompleted;
