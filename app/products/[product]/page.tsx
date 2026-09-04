
'use client'
import Link from 'next/link';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';
import TextBoxPage from '@/app/text-input/page';
import TextBoxCustom from '@/app/src/TextBoxCustom';




export default function Page({params,}: {params: Promise<{product: string}>}) {
  const [data, setData] = useState<any>(null)
  const { product } = use(params)


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}${(process.env.NEXT_PUBLIC_LOCAL_PORT ? `:${process.env.NEXT_PUBLIC_LOCAL_PORT}/` : '/')}products/${product}`)
      .then((res) => res.json())
      .then((data) => {
        let sortedData = {...data.product[0]};
        setData(sortedData)
      })
  }, [])

  const addToCart = (productData:JSON) => {

    window.localStorage.setItem('cart', JSON.stringify([...JSON.parse(window.localStorage.getItem('cart') || '[]'), {...productData, product_quantity: data?.product_quantity}]));
    alert('Added to cart')
  }

  return <div>
      {/* <Image src="/WebPOS.png" alt="sample image" width={200} height={200} className="rounded-full mb-4"
                /> */}
    The price for this {data?.product_name}: {data?.product_price}

    <TextBoxCustom filled={true} setFilledValue={(value: any) => setData({...data, product_quantity: value})} label="Quantity"
    // setFilledValue={(value: any) => console.log('Filled value:', value)} 
    setStandardValue={(value: any) => console.log('Standard value:', value)} />
    
    <Link href='' onClick={() => {addToCart(data)}} className="hover:underline flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]">
      Add to cart
    </Link>
  
  </div>;
}
 
