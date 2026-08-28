'use client';
import { TextField } from '@mui/material';

export default function TextBoxPage() {

  return (
    <div 
    className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black"
    >
      {/* <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"> */}
          <TextField className="bg-white" id="filled-basic" label="Filled" variant="filled" style={{ padding: '10px', borderRadius: '5px' }} />
        <div className="text-white">This is the Filled Text Input page</div>
      {/* </main> */}
    </div>
  );
}
