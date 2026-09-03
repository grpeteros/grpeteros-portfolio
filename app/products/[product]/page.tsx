
'use client'
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';




export default function Page() {
const [data, setData] = useState<any>(null)


    useEffect(() => {
        fetch('https://grpeteros-portfolio-be.onrender.com/dishwashing-liquid-lemon')
          .then((res) => res.json())
          .then((data) => {
            let sortedData = data;
            setData(sortedData)
          })
      }, [])

  return <div>The price for this is: {data?.price}</div>;
}

