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



const GeminiCalculator = ({tokens, onReset}: OpenaiCalculatorProps) =>{

  const [geminiflash, setGeminiflash] = useState<string>('Gemini flash 1.5(free)')
  const [geminipayasyougo, setGeminipayasyougo] = useState<string>('Gemini Flash 1.5 (Pay-as-you-go)')
  const [geminiProOneFive, setGeminiProOneFive] = useState<string>('Gemini PRO 1.5 (free)')
  const [geminipropayasyougoOneFive, setGeminipropayasyougoOneFive] = useState<string>('Gemini PRO 1.5 (Pay-as-you-go)')
  const [geminiProOneZero, setGeminiProOneZero] = useState<string>('Gemini PRO 1.0 (free)')
  const [geminiProOneZeroPayAsYouGo, setGeminiProOneZeroPayAsYouGo] = useState<string>('Gemini PRO 1.0 (Pay-as-you-go)')
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
  const [showPricingLinks, setShowPricingLinks] = useState('false')

  const handleOnReset = ()=> {
  
    setContextWindow('No model selected')
    setTrainingData('No model selected')
    onReset()

  }

  
  

  const handleChange = (value: string)=>{
  if(value === 'Gemini flash 1.5(free)'){
    setModelInputPriceExplanation('0 per 1,000,000 tokens')
    setModelOutputPriceExplanation('0 per 1,000,000 tokens')
    setModelInputPrice(0)
    setModelOutputPrice(0)
    setSelectedModel(geminiflash)
    setContextWindow('Not disclosed')
    setRpm('15 Requests')
    setRetraining('YES')
    setTrainingData('Not disclosed')
  }else if((value === 'Gemini Flash 1.5 (Pay-as-you-go)')){
    setModelInputPriceExplanation('0.35 per 1,000,000 tokens')
    setModelOutputPriceExplanation('1.05 per 1,000,000 tokens')
    setModelInputPrice(0.35)
    setModelOutputPrice(1.05)
    setSelectedModel(geminipayasyougo)
    setContextWindow('Over 128,000 tokens')
    setRpm('1000 Requests')
    setRetraining('NO')
    setTrainingData('Not disclosed')
  }else if((value === 'Gemini PRO 1.5 (free)')){
    setModelInputPriceExplanation('0 per 1,000,000 tokens')
    setModelOutputPriceExplanation('0 per 1,000,000 tokens')
    setModelInputPrice(0)
    setModelOutputPrice(0)
    setSelectedModel(geminiProOneFive)
    setContextWindow('Not disclosed')
    setRpm('2 Requests')
    setRetraining('YES')
    setTrainingData('Not disclosed')
  }else if((value === 'Gemini PRO 1.5 (Pay-as-you-go)')){
    setModelInputPriceExplanation('3.50 per 1,000,000 tokens')
    setModelOutputPriceExplanation('10.0 per 1,000,000 tokens')
    setModelInputPrice(3.50)
    setModelOutputPrice(10)
    setSelectedModel(geminipropayasyougoOneFive)
    setContextWindow('Over 128,000 tokens')
    setRpm('350 Requests')
    setRetraining('NO')
    setTrainingData('Not disclosed')
  }else if((value === 'Gemini PRO 1.0 (free)')){
    setModelInputPriceExplanation('0 per 1,000,000 tokens')
    setModelOutputPriceExplanation('0 per 1,000,000 tokens')
    setModelInputPrice(0)
    setModelOutputPrice(0)
    setSelectedModel(geminiProOneZero)
    setContextWindow('Not disclosed')
    setRpm('15 Requests')
    setRetraining('YES')
    setTrainingData('Not disclosed')
  }else if((value === 'Gemini PRO 1.0 (Pay-as-you-go)')){
    setModelInputPriceExplanation('0.50 per 1,000,000 tokens')
    setModelOutputPriceExplanation('1.50 per 1,000,000 tokens')
    setModelInputPrice(0.50)
    setModelOutputPrice(1.50)
    setSelectedModel(geminiProOneZeroPayAsYouGo)
    setContextWindow('Not disclosed')
    setRpm('350 Requests')
    setRetraining('NO')
    setTrainingData('Not disclosed')
  }else{
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
         <span className='font-extrabold'> GEMINI</span></p>

     <p>Selected Model: {selectedModel? selectedModel : 'None'}</p>
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent className="bg-black text-white">
        <SelectGroup>
          <SelectLabel>Model</SelectLabel>
          <SelectItem value={geminiflash}>Gemini flash 1.5(FREE)</SelectItem>
          <SelectItem value={geminipayasyougo}>Gemini flash 1.5(Pay-as-you-go)</SelectItem>
          <SelectItem value={geminiProOneFive}>Gemini PRO 1.5(FREE)</SelectItem>
          <SelectItem value={geminipropayasyougoOneFive}>Gemini PRO 1.5(Pay-as-you-go)</SelectItem>
          <SelectItem value={geminiProOneZero}>Gemini PRO 1.0(FREE)</SelectItem>
          <SelectItem value={geminiProOneZeroPayAsYouGo}>Gemini PRO 1.0(Pay-as-you-go)</SelectItem>
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
    <p className="text-sm text-red-500">Excluding free users</p>
    <Link href='https://ai.google.dev/pricing'>
    <Button className="bg-blue-500 hover:bg-blue-500  rounded-2xl text-white">Source
      
    </Button>
    </Link>
    </div>
  
    </div>
  )
}

export default GeminiCalculator
