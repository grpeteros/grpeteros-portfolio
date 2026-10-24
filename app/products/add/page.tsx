
'use client'
import Link from 'next/link';
import { useState } from 'react';
import TextBoxCustom from '@/app/src/TextBoxCustom';
import { showToast } from "nextjs-toast-notify";
import NumberSpinner from '@/app/src/NumberSpinnerCustom';




export default function AddProduct({ params, }: { params: Promise<{ product: string }> }) {
  const [price, setPrice] = useState<any>(0)
  const [name, setName] = useState<any>('')

  const addProduct = async () => {
    let productData = name
    productData = { ...productData, product_price: price };

    if (productData.product_price === undefined || productData.product_price <= 0) {
      // alert('Please enter a valid price')
      showToast.error(`Please enter a valid price`, {
        duration: 4000, // 4 seconds
        position: "top-right",
        transition: "bounceIn",
        progress: true
      });
      return;
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}:${process.env.NEXT_PUBLIC_LOCAL_PORT}/products/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product: productData })
      }).then((res) => res.json())
        .catch(error => {
          showToast.error(`${error.message}`, {
            duration: 4000, // 4 seconds
            position: "top-right",
            transition: "bounceIn",
            
            progress: true
          });
        })
        .then((data) => {
          if (data.message || !data.error) {
            showToast.success(`${data.message}`, {
              duration: 4000, // 4 seconds
              position: "top-right",
              transition: "bounceIn",
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
              progress: true
            });
            return;
          } else {
            showToast.error(`${data.error}`, {
              duration: 4000, // 4 seconds
              position: "top-right",
              transition: "bounceIn",
              progress: true
            });
          }

        })

    }
  }

  return <div className="flex flex-col items-center justify-center gap-4 p-4 w-full">
    <TextBoxCustom key="product_name" className={`w-99/100`} noLabel={true} filled={true} setFilledValue={(value: string) => setName({ ...name, product_name: value })} label="Product Name" />
    <NumberSpinner
      className={`bg-white p-16 rounded align-center`}
      label="Product price"
      min={0}
      max={10000000}
      defaultValue={0}
      value={price}
      onChange={(value: Number) => {
        setPrice(parseFloat(String(value).replace(/,/g, '')));
      }}
      error={price < 0}
    />
    {/* <TextBoxCustom key="product_price" className={`w-99/100`} noLabel={true} filled={true} setFilledValue={(value: number) => setPrice({ ...data, product_price: value })} label="Product Price" /> */}
    <Link href='' onClick={() => { addProduct() }} className="hover:underline flex py-5 h-12 w-full items-center font-bold justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
      style={{ marginTop: '5px' }}
    >
      Add Product
    </Link>

  </div>;
}

