'use client';
import AccordionCustom from "./src/AccordionCustom";
import DropdownCustom from "./src/DropdownCustom";
import TextBoxCustom from "./src/TextBoxCustom";
import RadioCustom from "./src/RadioCustom";
import { useState } from "react";
import { showToast } from "nextjs-toast-notify";


export default function Home() {
  const [outlined, setOutlined] = useState<string>('No data yet');
  const [filled, setFilled] = useState<string>('No data yet');
  const [standard, setStandard] = useState<string>('No data yet');
  const [age, setAge] = useState<string>('0');
  const [gender, setGender] = useState<string>('');

  const setOutlinedValue = (data: string) => {
    setOutlined(data);
  }

  const setFilledValue = (data: string) => {
    setFilled(data);
  }

  const setStandardValue = (data: string) => {
    setStandard(data);
  }

  const setAgeValue = (data: string) => {
    setAge(data);
  }
  const setGenderValue = (data: string) => {
    setGender(data);
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Home page
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">

            This is a demo project for Next.js 13 with App Router, Tailwind CSS, and TypeScript. It includes a custom Accordion, Dropdown, TextBox, and Radio components. You can use these components to build your own UI elements in your Next.js application.
          </p>
        </div>
        <div className="mb-8">
          <AccordionCustom />
        </div>

        <div className="mb-8">
          <div className="text-white">Dropdown</div>
          <DropdownCustom
            setDropdownValue={setAgeValue}
          />
        </div>

        <div className="mb-8">
          <TextBoxCustom
            outlined={true}
            filled={true}
            standard={true}
            setOutlinedValue={setOutlinedValue}
            setFilledValue={setFilledValue}
            setStandardValue={setStandardValue}
          />
        </div>
        <div className="text-white">Radio</div>
        <div className="bg-white text-black rounded-md p-4 mb-8">
          <RadioCustom
            setGenderValue={setGenderValue}

          />
        </div>

        <div
          className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent 
          bg-white text-black
          hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
          onClick={() => {

            showToast.info(`${outlined} ${filled} ${standard} is ${age} years old and a ${gender}`, {
              duration: 4000, // 4 seconds
              position: "top-right",
              transition: "bounceIn",
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
              progress: true
            });
          }}
        >
          Ok
        </div>
      </main>
    </div>
  );
}
