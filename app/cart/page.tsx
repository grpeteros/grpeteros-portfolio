'use client';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { showToast } from 'nextjs-toast-notify';

export default function CartPage() {
  const [cart, setCart] = useState<any>(null)
  const router = useRouter()
  useEffect(() => {
    const cart = window.localStorage.getItem('cart');
    setCart(cart);
  }, []);
  const getCart = () => {
    let total = 0;
    const cartData = JSON.parse(cart || '[]');
    for (let i = 0; i < cartData.length; i++) {
      const product = cartData[i];
      console.log(product?.product_price);
      total += Number(product?.product_price) * Number(product?.product_quantity);
    }

    return total.toFixed(2);
  }

  const resetCart = () => {
    window.localStorage.setItem('cart', JSON.stringify([]));
    setTimeout(() => {
        location.reload();
    }, 4000);
    showToast.info('Cart reset', {
      duration: 4000,
      position: "top-right",
      transition: "bounceIn",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
      progress: true
    });

  }
  const finishTransaction = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}:${process.env.NEXT_PUBLIC_LOCAL_PORT}/cart/finish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart: JSON.parse(cart || '[]') }),
    })

    if (response.ok) {
      showToast.success(`Transaction completed successfully!`, {
        duration: 4000, // 4 seconds
        position: "top-right",
        transition: "bounceIn",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
        progress: true,
      });
      setTimeout(() => {
        window.localStorage.setItem('cart', JSON.stringify([]));
        location.reload();
      }, 4000);
      
    }
  }


  return (
    <div
      className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black"
    >
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>

          <Typography variant="h2" component="h1" gutterBottom>
            Total
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom className="text-gray-600 dark:text-gray-400 justify-center">
            {JSON.parse(cart || '[]').length} item(s) in your cart

          </Typography>
          <Typography variant="h6" component="h3" gutterBottom className="text-gray-600 dark:text-gray-400 justify-center">
            {JSON.parse(cart || '[]').map((item: any, index: number) => (
              <div key={index}> 
                <Typography variant="h6" component="h3" gutterBottom className="text-gray-600 dark:text-gray-400 justify-center">   
                  {`${item.product_name} - PHP${item.product_price} x ${item.product_quantity} = PHP${(Number(item.product_price) * Number(item.product_quantity)).toFixed(2)}` }
                </Typography>
              </div>
            ))}
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom className="text-gray-600 dark:text-gray-400 justify-center">
            The total amount of your cart is: PHP{getCart()}
          </Typography>


          <Link href='' onClick={() => { resetCart() }} className="hover:underline flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]">
            Reset Cart
          </Link>

          <Link href='' onClick={() => { finishTransaction() }} className="hover:underline flex h-12 w-full items-center justify-center gap-2 rounded-full px-2 border border-foreground my-6 transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]">
            Finish Transaction
          </Link>
        </div>
      </main>
    </div>
  );
}
