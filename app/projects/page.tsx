'use client';
import { Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectsPage() {

  return (
    <div
      className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black"
    >
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <Typography variant="h2" component="h1" gutterBottom>
            GovStack
          </Typography>


          <Link
            href="https://www.govstack.com/"
            className="block px-4 py-2 text-sm hover:bg-slate-100 transition borderRadius: 10px"
            target="_blank"
          >
            <Image src="/govStack.png" alt="GovStack"
              width={600} height={600}
              className="mb-4" />

          </Link>

          <Typography variant="h2" component="h1" gutterBottom>
            Harley Davidson Cebu
          </Typography>

          <Image src="/REV.jpeg" alt="REV12345"
            width={200} height={200}
            className=" mb-4" />


          <Typography variant="h2" component="h1" gutterBottom>
            Alliance WebPOS
          </Typography>
          <Link
            href="http://app.alliancewebpos.net/hq/login"
            className="block px-4 py-2 text-sm hover:bg-slate-100 transition borderRadius: 10px"
            target="_blank"
          >
            <Image src="/WebPOS.png" alt="WebPOS"
              width={600} height={600}
              className=" mb-4" />

          </Link>
        </div>
      </main>
    </div>
  );
}
