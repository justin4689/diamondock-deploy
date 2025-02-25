import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

const CardForm = () => {
  return (
    <div className="w-full">
      <div className="p-4 border rounded-md bg-white">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
    </div>
  );
};

export default CardForm;
