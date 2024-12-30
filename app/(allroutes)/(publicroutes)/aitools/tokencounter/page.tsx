'use client'
import React from 'react'
import {useState, useEffect} from 'react'
import { countTokens } from '@/components/tokencounter'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import OpenaiCalculator from '../../../../../components/tokencounter/openaicalculator'
import GeminiCalculator from '../../../../../components/tokencounter/geminicalculator'
import WordGenerator from '@/components/wordgenerator'
import ContextExplanation from '@/components/contextexplanation'
import { tokenExplanationHeader, tokenExplanationText } from '@/components/contextdefinitions'


const TokenCounterPage = () => {

  const [text, setText] = useState<string>('')
  const [tokens, setTokens] = useState<number>(0)

  const handleTokenCounter = ()=>{

   let newTokens: number = 0
   if (text === ''){
   newTokens = 0
   }else{
    newTokens = countTokens(text)
   }
   setTokens(newTokens)
  }

  useEffect(()=>{
    handleTokenCounter()
  }, [text])

  const handleReset = ()=>{
    setTokens(0)
    setText('')
  }


  return (
    <div>

    <div className='p-4'>
        <h1 className='py-8 text-center text-3xl'>Token Counter</h1>
        <div className='flex flex-col justify-center items-center gap-3'>
        <p className='font-extrabold text-2xl text-blue-500'>Text Area</p>
        <Textarea value={text} onChange={(e)=>setText(e.target.value)} 
        placeholder='Type or paste text here'
        className='h-32 md:w-1/2 text-md p-0 m-0'   />

        <div className='flex gap-3'>
        <Button 
        className='bg-blue-500 rounded-2xl text-white hover:bg-blue-500' 
        onClick={handleReset}>Reset</Button>

        <WordGenerator />
        </div>
        
        <p className='font-extrabold text-2xl text-red-500'>Tokens<span> (input)</span></p>
        <p className='font-extrabold text-2xl'>{tokens}</p>
        
        {/* OpenAI Costing */}
        <div className='text-center flex md:flex-row flex-col gap-16 md:gap-32'>
        <div>
         <OpenaiCalculator tokens={tokens} onReset={handleReset} />
         </div>
          {/* Gemini Costing */}
         <div>
          <GeminiCalculator tokens={tokens} onReset={handleReset} />
         </div>
        </div>
        </div>
       


<p className='text-center font-extrabold text-2xl'>FAQs</p>
<div className='flex justify-center'>
<div className='flex gap-2'>
  <p>What are tokens?</p><ContextExplanation header={tokenExplanationHeader} text={tokenExplanationText} />
</div>
</div>



</div>


</div>
  )
}

export default TokenCounterPage