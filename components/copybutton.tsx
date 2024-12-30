"use client"
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';

export interface CopyButtonType {
textToCopy: string;
}

const CopyButton = ({textToCopy}: CopyButtonType) => {
  const [message, setMessage] = useState<string>('')
  // State to hold the text to copy

  // Function to copy text to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);
    setMessage('Copied')
  };

  return (
    <div className='flex justify-center items-center gap-4'>
      <Button onClick={copyToClipboard} className='bg-blue-900 rounded-2xl w-full mb-2 hover:bg-blue-900'>Copy</Button>
      <p className='text-white'>{message}</p>
    </div>
  );
};

export default CopyButton;
