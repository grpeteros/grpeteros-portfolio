'use client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TextBoxCustom from "@/app/src/TextBoxCustom";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable() {

  const [data, setData] = useState<any>(null)
  const [sortedData, setSorted] = useState<any>([])
  const [filled, setFilled] = useState<string>('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}${(process.env.NEXT_PUBLIC_LOCAL_PORT ? `:${process.env.NEXT_PUBLIC_LOCAL_PORT}` : '')}/products/`)
      .then((res) => res.json())
      .then((data) => {
        let sortedData = data.products.sort((a: any, b: any) => a.product_name.localeCompare(b.product_name));
        setData(sortedData)
        setSorted(sortedData)
      })
  }, [])

  useEffect(() => {
    const dataArr = data ?? [];
    if (filled.length > 0) {
      let filterData = dataArr.filter((elem: any) => {
        return String(elem.product_name).includes(filled)
      })
      let sortedDataArr = filterData?.sort((a: any, b: any) => a.product_name.localeCompare(b.product_name));
      setSorted(sortedDataArr)

    } else {
      setSorted(data)
    }

  }, [filled])


  const setFilledValue = (data: string) => {
    setFilled(data);
  }

  return (
    <div className={`flex flex-col`}>
      <div className='mb-8'>
        <TextBoxCustom
          filled={true}
          label=""
          setFilledValue={setFilledValue}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData?.map((row: any) => (
              <TableRow
                key={row.product_name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link href={`/products/${row.product_name}`} className="hover:underline">
                    {row.product_name}

                  </Link>
                </TableCell>
                {/* <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
