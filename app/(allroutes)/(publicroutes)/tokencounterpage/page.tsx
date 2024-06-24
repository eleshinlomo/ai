'use client'
import React from 'react'
import {useState, useEffect} from 'react'
import { countTokens } from '@/components/tokencounter'
import { Textarea } from '@/components/ui/textarea'
import HomeNavBar from '@/components/homenavbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import OpenaiCalculator from './openaicalculator'
import { OpenaiCalculatorProps } from './openaicalculator'
import GeminiCalculator from './geminicalculator'
import WordGenerator from '@/components/wordgenerator'


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
       
        

<p className='font-extrabold text-2xl'>Explanation</p>
<div className='font-semibold text-lg flex flex-col gap-3'>
<p>In the context of natural language processing (NLP) 
 and machine learning (ML), a token is a single unit of text, 
often a word or a punctuation mark, obtained by splitting the 
text on whitespace or other delimiters.</p>

<p>Here are a few examples to illustrate what tokens are:</p>

<p>In the sentence {"'The cat is sleeping.'"}, the tokens are:
 {'"The"'}, {'"cat"'}, {'"is"'}, {'"sleeping"'}, and {'"."'}.</p>

<p>In the phrase {" 'MyAfros' language model is powerful!'"}, 
  the tokens are: {'"MyAfros" '}, {'"language" '}, {'"model" '}, {'"is" '}, 
{'"powerful" '}, and {' "!"'}.</p>

<p>In the text {'123 Main Street, New York'}, the tokens are:
 {'"123"'}, {'"Main"'}, {'"Street,"'}, {'"New"'}, and {'"York"'}.</p>

 <p>
 Whether full stops are counted as tokens depends on the granularity of 
 tokenization and the specific requirements of the NLP or ML task. 
 In many cases, especially in word-level tokenization, 
 full stops are counted as separate tokens because they represent 
 punctuation and can convey 
 important information about sentence structure and semantics.
 </p>
 </div>

</div>


</div>
  )
}

export default TokenCounterPage