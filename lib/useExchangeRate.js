'use client';
import { useEffect, useState } from 'react';

export default function useExchangeRate() {
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRate = async () => {
      try {
        const res = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=NGN');
        const data = await res.json();
        if (data && data.rates?.NGN) {
          setRate(data.rates.NGN);
        }
      } catch (err) {
        console.error('Failed to fetch exchange rate', err);
      } finally {
        setLoading(false);
      }
    };
    getRate();
  }, []);

  return { rate, loading };
}
