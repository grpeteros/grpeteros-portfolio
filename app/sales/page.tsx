'use client';
import { Typography } from '@mui/material';
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
        setLoading(false)
      })
  }, [])


  const printToExcel = () => {
    fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}:${process.env.NEXT_PUBLIC_LOCAL_PORT}/sales/print`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sales_${new Date().toISOString().slice(0, 10)}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
  }

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No sales data</p>
  return (
    <div
      className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black"
    >
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"
      >
        <div>
          <Typography variant="h2" component="h1" gutterBottom>
            Total sales for the last 30 days
          </Typography>
          <Typography variant="h3" component="h3" gutterBottom>
            {`${new Date(new Date().setDate(new Date().getDate() - 30)).toLocaleDateString()} ~ ${new Date().toLocaleDateString()}`}
          </Typography>
          <Typography variant="h4" component="h4" gutterBottom className="text-gray-600 dark:text-gray-400 justify-center">
            Total Sales:
            PHP{totalPrice.toFixed(2)}
          </Typography>
          <Typography variant="h6" component="h6" gutterBottom className="text-gray-600 dark:text-gray-400 justify-center">
            <button onClick={printToExcel} 
            aria-label="Print to Excel"
            className="cursor-pointer hover:underline flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]">
              Excel
            </button>
          </Typography>
        </div>
        <div className="flex flex-col gap-2">


          {data?.map((transaction: any, index: number) => (
            <div key={index}>
              {transaction.products.map((product: any, productIndex: number) => (
                <div key={productIndex}>
                  <Typography variant="h6" component="h6" gutterBottom className="text-gray-600 dark:text-gray-400 justify-center">
                    {`(${new Date(transaction.created_at).toLocaleDateString()}) ${product.product_name} - PHP${product.product_price} x ${product.product_quantity} = PHP${(Number(product.product_price) * Number(product.product_quantity)).toFixed(2)}`}
                  </Typography>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
