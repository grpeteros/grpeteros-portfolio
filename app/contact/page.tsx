'use client';
import { Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function DropdownPage() {

  return (
    <div
      className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black"
    >
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>

          <Image src="/DSC_0072.jpg" alt="Gaius Rei D. Peteros" width={200} height={200} className="rounded-full mb-4"
          />

          <Typography variant="h2" component="h1" gutterBottom>
            Gaius Rei D. Peteros
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom className="text-gray-600 dark:text-gray-400 justify-center">
            A passionate and dedicated software engineer with a strong background in web development, specializing in React, Next.js, and Material-UI. 
            I have a keen eye for detail and a commitment to delivering high-quality, user-friendly applications. 
            My experience includes building responsive and accessible web interfaces, optimizing performance, and collaborating with cross-functional teams to bring innovative ideas to life. 
            I am always eager to learn new technologies and stay up-to-date with industry trends to continuously improve my skills and contribute to the success of the projects I work on.
          </Typography>

          <Link href="mailto:grpeteros06@gmail.com" className="hover:underline flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]">
            Email Me
          </Link>
          <Link href="tel:+639420055921" className="mt-5 hover:underline flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]">
            Phone
          </Link>
        </div>
      </main>
    </div>
  );
}
