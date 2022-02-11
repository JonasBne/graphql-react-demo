/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useQuery, gql } from '@apollo/client';

interface ExchangeRate {
  rate: string;
  currency: string;
}

interface ExchangeRatesData {
  rates: ExchangeRate[];
}

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery<ExchangeRatesData>(EXCHANGE_RATES);

  return (
    <>
      {loading && <span>Loading ...</span>}
      {error && <span>Error: {error}</span>}
      {data &&
        data?.rates.map(({ currency, rate }) => (
          <div key={currency}>
            <p>
              {currency}: {rate}
            </p>
          </div>
        ))}
    </>
  );
}

export default ExchangeRates;
