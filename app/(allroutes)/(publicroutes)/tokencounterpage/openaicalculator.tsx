import * as React from "react"
import {useState, useEffect} from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import Link from "next/link";


export interface OpenaiCalculatorProps {
    tokens: number;
    onReset: ()=>void;
}



const OpenaiCalculator = ({tokens, onReset}: OpenaiCalculatorProps) =>{

  const [gpt4o, setGpt4o] = useState<string>('GPT4-o')
  const [gpt4Turbo, setGpt4Turbo] = useState<string>('GPT4-Turbo')
  const [gpt4, setGpt4] = useState<string>('GPT-4')
  const [gpt3, setGpt3] = useState<string>('GPT-3.5 Turbo')
  const [inputCost, setInputCost] = useState<number>(0)
  const [outputCost, setOutputCost] = useState<number>(0)
  const [modelInputPrice, setModelInputPrice] = useState<number>(0)
  const [modelOutputPrice, setModelOutputPrice] = useState<number>(0)
  const [modelInputPriceExplanation, setModelInputPriceExplanation] = useState('0')
  const [modelOutputPriceExplanation, setModelOutputPriceExplanation] = useState('0')
  const [selectedModel, setSelectedModel] = useState<string>('')
  const [contextWindow, setContextWindow] = useState<string>('No selected model')
  const [trainingData, setTrainingData] = useState<string>('No selected model')
  const [retraining, setRetraining] = useState<string>('?')
  const [rpm, setRpm] = useState('No selected model')

  const handleOnReset = ()=> {
  
    setContextWindow('No model selected')
    setTrainingData('No model selected')
    onReset()

  }

  
  

  const handleChange = (value: string)=>{
  if(value === 'GPT4-o'){
    setModelInputPriceExplanation('5 per 1,000,000 tokens')
    setModelOutputPriceExplanation('15 per 1,000,000 tokens')
    setModelInputPrice(5)
    setModelOutputPrice(15)
    setSelectedModel(gpt4o)
    setContextWindow('128,000 tokens')
    setTrainingData('	Up to Oct 2023')
    setRpm('Between 3 to 10,000 requests')
    setRetraining('NO')
  }else if(value === 'GPT4-Turbo'){
    setModelInputPriceExplanation('10 per 1,000,000 tokens')
    setModelOutputPriceExplanation('30 per 1,000,000 tokens')
    setModelInputPrice(10)
    setModelOutputPrice(30)
    setSelectedModel(gpt4Turbo)
    setContextWindow('128,000 tokens')
    setTrainingData('Up to Dec 2023')
    setRpm('Between 3 to 10,000 requests')
    setRetraining('NO')
  }else if(value === 'GPT-4'){
    setModelInputPriceExplanation('30 per 1,000,000 tokens')
    setModelOutputPriceExplanation('60 per 1,000,000 tokens')
    setModelInputPrice(30)
    setModelOutputPrice(60)
    setSelectedModel(gpt4)
    setContextWindow('8,192 tokens')
    setTrainingData('Up to Sep 2021')
    setRpm('Between 3 to 10,000 requests')
    setRetraining('NO')
  }else if(value === 'GPT-3.5 Turbo'){
    setModelInputPriceExplanation('0.50 per 1,000,000 tokens')
    setModelOutputPriceExplanation('1.50 per 1,000,000 tokens')
    setModelInputPrice(0.50)
    setModelOutputPrice(1.50)
    setSelectedModel(gpt3)
    setContextWindow('16,385 tokens')
    setTrainingData('Up to Sep 2021')
    setRpm('Between 3 to 10,000 requests')
    setRetraining('NO')
  }
  else{
    setModelInputPrice(0)
    setModelOutputPrice(0)
  }

  }
  const calculateInputCost = () =>{
     const cost = tokens / 1000000 * modelInputPrice
     setInputCost(cost)
  }

  useEffect(()=>{
    calculateInputCost()
  }, [tokens, modelInputPrice])


  const calculateOutputCost = () =>{
    const cost = tokens / 1000000 * modelOutputPrice
    setOutputCost(cost)
 }

 useEffect(()=>{
   calculateOutputCost()
 }, [tokens, modelOutputPrice])



  return (
    <div className="flex flex-col justify-center items-center">
    <p className='font-semibold'>COST USING 
         <span className='font-extrabold'> OPENAI</span></p>

     <p>Selected Model: {selectedModel? selectedModel : 'None'}</p>
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent className="bg-black text-white">
        <SelectGroup>
          <SelectLabel>Model</SelectLabel>
          <SelectItem value={gpt4o}>GPT-4o</SelectItem>
          <SelectItem value={gpt4Turbo}>GPT4-Turbo</SelectItem>
          <SelectItem value={gpt4}>GPT-4</SelectItem>
          <SelectItem value={gpt3}>GPT-3.5 Turbo</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    
    
    <div>
    <p className='font-semibold'>INPUT COST
         <span className='font-extrabold text-2xl text-green-500'> ${inputCost}</span></p>
    <p className='font-semibold'>INPUT COST + OUTPUT COST
    <span className='font-extrabold text-lg text-green-500'> ${inputCost +  outputCost}</span></p>
    <p className="text-sm">Assuming input tokens and output tokens are thesame.</p>
    <p className="text-red-500">Model Input Price: ${modelInputPriceExplanation}</p>
    <p className="text-red-500">Model Output Price: ${modelOutputPriceExplanation}</p>
    <p>Context Window: {contextWindow}</p>
    <p>Training Data: {trainingData}</p>
    <p>Request Per Minute(RPM): {rpm}</p>
    <p>Prompt is used for model re-training: {retraining}</p>
    <p className="text-sm text-red-500">Excluding chatGPT & Dall-E free users</p>
    <Link href='https://openai.com/api/pricing/'>
    <Button className="bg-blue-500 hover:bg-blue-500  rounded-2xl text-white">Source
      
    </Button>
    </Link>
    </div>
  
    </div>
  )
}

export default OpenaiCalculator
