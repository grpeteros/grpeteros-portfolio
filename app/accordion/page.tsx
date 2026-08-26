import * as React from 'react';
import AccordionCustom from '../src/AccordionCustom';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function AccordionPage() {
  const id = React.useId();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"> */}
        <AccordionCustom />
        <div>THIS IS ACCORDION</div>
      {/* </main> */}
    </div>
  );
}
