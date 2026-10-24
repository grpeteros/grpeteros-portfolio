'use client';
import { Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const StyledText = styled('text')(({ theme }: { theme: Theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 14,
}));

interface PieCenterLabelProps {
  children: React.ReactNode;
}

function PieCenterLabel({ children }: PieCenterLabelProps): React.ReactElement {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function SalesPage() {
  const [data, setData] = useState<any>(null)
  const [mappedData, setMappedData] = useState<any>(null)
  const [isLoading, setLoading] = useState(true)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
  const [endDate, setEndDate] = useState<Date>(new Date())

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}:${process.env.NEXT_PUBLIC_LOCAL_PORT}/sales`)
      .then((res) => res.json())
      .then((data) => {
        let sortedData = data.transactions.sort((a: any, b: any) => b.id - a.id);
        setData(sortedData);
        mapData(sortedData);
        const total = sortedData.reduce((sum: number, sale: any) => sum + sale.total_price, 0);
        setTotalPrice(total);
        setLoading(false);
      })
  }, [])


  useEffect(() => {
    // setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}:${process.env.NEXT_PUBLIC_LOCAL_PORT}/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ startDate: startDate, endDate: endDate }),
    }).then((res) => res.json())
      .then((data) => {
        let sortedData = data.transactions.sort((a: any, b: any) => b.id - a.id);
        setData(sortedData);
        mapData(sortedData);
        const total = sortedData.reduce((sum: number, sale: any) => sum + sale.total_price, 0);
        setTotalPrice(total);
        // setLoading(false);
      })
  }, [startDate, endDate])


  const mapData = (dataToSort: any) => {
    const dataMap = new Map<string, number>();
    let totalQty = 0;
    dataToSort.forEach((x: any) => {
      x.products.forEach((element: any) => {
        dataMap.set(
          element.product_name,
          (dataMap.get(element.product_name) ?? 0) + Number(element.product_quantity)
        );

        totalQty += Number(element.product_quantity);
      });
    })
    setTotalQuantity(totalQty);
    const dataArr: { id: number; value: number; label: string }[] = []
    let i = 0;
    dataMap.forEach((dataMapped, key) => {
      dataArr.push({ id: i++, value: dataMapped, label: key })
    })
    setMappedData(dataArr);
  }

  const printToExcel = () => {
    fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}:${process.env.NEXT_PUBLIC_LOCAL_PORT}/sales/print`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ startDate: startDate, endDate: endDate }),
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
          <div className='flex flex-col lg:flex-row items-center content-center'>
            <Typography variant="h4" component="h4" className='ml-12 pb-8 lg:pb-0 date-range-label'>
              Date Range {`${(window.innerWidth < 1024) ? `` : '|'}`}
            </Typography>
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    variant="outline"
                    data-empty={!startDate}
                    className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                  />
                }
              >
                {/* <CalendarIcon /> */}
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar required mode="single" selected={startDate} onSelect={setStartDate} />
              </PopoverContent>
            </Popover>
            <h3 className={``} style={{ fontSize: '30px' }}>{`${window.outerWidth >= 1024 ? `-` : "|"}`}</h3>
            <div>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      data-empty={!endDate}
                      className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                    />
                  }
                >
                  {/* <CalendarIcon /> */}
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar required mode="single" selected={endDate} onSelect={setEndDate} />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className={`flex flex-col items-center lg:flex-row lg:items-baseline`}>
            <Typography variant="h3" component="h3" gutterBottom>
              {`${startDate.toLocaleDateString()}`}
            </Typography>
            <h3 className={``} style={{ fontSize: '65px' }}>{`${window.outerWidth >= 1024 ? `-` : "|"}`}</h3>
            <Typography variant="h3" component="h3" gutterBottom>
              {`${endDate.toLocaleDateString()}`}
            </Typography>
          </div>
          <Typography variant="h4" component="h4" gutterBottom className="text-gray-600 dark:text-gray-400 justify-center">
            Total Sales: {`${new Intl.NumberFormat("en-PH", { style: "currency", currency: "php" }).format(totalPrice)}`}
          </Typography>
          <Typography variant="h6" component="h6" gutterBottom className="text-gray-600 dark:text-gray-400 justify-center">
            <button onClick={printToExcel}
              aria-label="Print to Excel"
              className="cursor-pointer hover:underline flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]">
              Excel
            </button>
          </Typography>
        </div>
        <div>
          <PieChart
            className='bg-white rounded-md p-5'
            series={[
              {
                data: mappedData,
                innerRadius: 50,
                outerRadius: 100,
                arcLabel: (item) => `${Number(item.value / totalQuantity * 100).toFixed(2)}%`,
                arcLabelMinAngle: 10,
                cornerRadius: 5,
              },
            ]}
            width={400}
            height={200}
          >
            {mappedData.length > 0 && <PieCenterLabel>RINIL Farm</PieCenterLabel>}
          </PieChart>



        </div>
        <div className="flex flex-col gap-2">
          {data?.map((transaction: any, index: number) => (
            <div key={index}>
              {transaction.products.map((product: any, productIndex: number) => (
                <div key={productIndex}>
                  <Typography variant="h6" component="h6" gutterBottom className="text-gray-600 dark:text-gray-400 justify-center">
                    {`(${new Date(transaction.created_at).toLocaleDateString()}) 
                    ${product.product_name} - 
                    ${`${new Intl.NumberFormat("en-PH", { style: "currency", currency: "php" }).format(Number(product.product_price))}`} x 
                    ${Number(product.product_quantity).toFixed(2)} = 
                    ${`${new Intl.NumberFormat("en-PH", { style: "currency", currency: "php" }).format(Number(product.product_price) * Number(product.product_quantity))}`}`}
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
