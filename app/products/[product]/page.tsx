
'use client'
import Link from 'next/link';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';
import TextBoxPage from '@/app/text-input/page';
import TextBoxCustom from '@/app/src/TextBoxCustom';
import { Typography } from '@mui/material';




export default function Page({ params, }: { params: Promise<{ product: string }> }) {
  const [data, setData] = useState<any>(null)
  const { product } = use(params)


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}${(process.env.NEXT_PUBLIC_LOCAL_PORT ? `:${process.env.NEXT_PUBLIC_LOCAL_PORT}/` : '/')}products/${product}`)
      .then((res) => res.json())
      .then((data) => {
        let sortedData = { ...data.product[0] };
        setData(sortedData)
      })
  }, [])

  const addToCart = (productData: any) => {
    if (productData.product_quantity === undefined || productData.product_quantity <= 0) {
      alert('Please enter a valid quantity')
      return
    }
    window.localStorage.setItem('cart', JSON.stringify([...JSON.parse(window.localStorage.getItem('cart') || '[]'), { ...productData, product_quantity: data?.product_quantity }]));
    alert('Added to cart')
  }

  return <div className="flex flex-col items-center justify-center gap-4 p-4">
    Product |  {data?.product_name}: PHP {data?.product_price} / kg
    <TextBoxCustom filled={true} setFilledValue={(value: number) => setData({ ...data, product_quantity: Number(value) })} label="Weight (kg)" />
    <Typography component="h2" className="semibold text-lg text-black dark:text-zinc-600">
      {`Amount: PHP ${data?.product_price * data?.product_quantity || 0}`}
    </Typography>
    <Link href='' onClick={() => { addToCart(data) }} className="hover:underline flex py-5 h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
      style={{ marginTop: '5px' }}
    >
      Add to cart
    </Link>

  </div>;
}

