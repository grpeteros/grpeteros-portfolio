
'use client'
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { use, useEffect, useState } from 'react';




export default function Page({params,}: {params: Promise<{product: string}>}) {
  const [data, setData] = useState<any>(null)
  const { product } = use(params)


  useEffect(() => {
    fetch(`https://grpeteros-portfolio-be.onrender.com/products/${product}`)
      .then((res) => res.json())
      .then((data) => {
        let sortedData = {...data.product[0]};
        setData(sortedData)
      })
  }, [])
  return <div>
      {/* <Image src="/WebPOS.png" alt="sample image" width={200} height={200} className="rounded-full mb-4"
                /> */}
    The price for this {data?.product_name}: {data?.product_price}
    
    <Link href='' onClick={() => {}} className="hover:underline flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]">
      Add to cart
    </Link>
  
  </div>;
}
 
