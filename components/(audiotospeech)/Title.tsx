import { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from 'next/link'

type Props = {
  setMessages: any;
};



function Title({ setMessages }: Props) {
  const [isResetting, setIsResetting] = useState(false);

  // Hooks
  const path = usePathname()

  // Reset conversation
  const resetConversation = async () => {
    setIsResetting(true);

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    await axios
      .get(`${BASE_URL}/reset`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status == 200) {
          setMessages([]);
        }
      })
      .catch((err) => {});

    setIsResetting(false);
  };

  return (
    <div className="flex justify-between items-center text-sm
    px-2 py-2 bg-gray-900 text-white font-extrabold shadow  mb-5 ">
      <div className="italic">
        <p>CONTENT</p>
        </div>
       {path === '/voicechat' ?
        <Button variant='default'   className="text-white bg-gray-700
         hover:bg-gray-700 text-sm  py-4 rounded-2xl">
          <Link href='/textchat'>SWITCH TO SCRIPT WRITER</Link></Button>:
        <Button variant='default'  className="text-white bg-gray-700
         hover:bg-gray-700 text-sm rounded-2xl  py-4">
         <Link href='/voicechat'>SWITCH TO VOICE CHAT</Link></Button>
       }
      <button
        onClick={resetConversation}
        className={
          "transition-all duration-300 text-blue-300 hover:text-pink-500 " +
          (isResetting && "animate-pulse")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
    </div>
  );
}

export default Title;
