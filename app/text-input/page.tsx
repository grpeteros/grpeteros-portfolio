'use client';
import TextBoxCustom from '../src/TextBoxCustom';

export default function TextBoxPage() {

  return (
    <div 
    className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black"
    >
      {/* <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"> */}
          <TextBoxCustom />
        <div className="text-white">This is the Text Input page</div>
      {/* </main> */}
    </div>
  );
}
