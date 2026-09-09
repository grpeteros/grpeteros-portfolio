'use client';
import { Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react'

export default function SalesPage() {
  const [data, setData] = useState<any>(null)
  const [isLoading, setLoading] = useState(true)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}:${process.env.NEXT_PUBLIC_LOCAL_PORT}/sales`)
      .then((res) => res.json())
      .then((data) => {
        let sortedData = data.transactions.sort((a: any, b: any) => b.id - a.id);
        setData(sortedData)

        const total = sortedData.reduce((sum: number, sale: any) => sum + sale.total_price, 0);
        setTotalPrice(total);
        console.log(total)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No sales data</p>
  return (
    <div
      className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black"
    >
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start" 
        >
          <div>
            <Typography variant="h3" component="h1" gutterBottom>
              Total sales for the last 30 days
            </Typography> 
            <Typography variant="h2" component="h1" gutterBottom>
             { `${new Date(new Date().setDate(new Date().getDate() - 30)).toLocaleDateString()} ~ ${new Date().toLocaleDateString()}`} PHP{totalPrice.toFixed(2)}
            </Typography> 

          </div>
        </main>
    </div>
  );
}
