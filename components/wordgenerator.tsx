import {useState, useEffect} from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import CopyButton from './copybutton'
import ScrollableTextArea from './scrollabletextarea'



const WordGenerator = () => {

    const [words, setWords] = useState<string>('')
    const [oneHundredWords, setOneHundredWords] = useState<string>('100 Words')
    const [threeHundredWords, setThreeHundredWords] = useState<string>('300 Words')
    const [fiveHundredWords, setFiveHundredWords] = useState<string>('500 Words')
    const [oneThousandWords, setOneThousandWords] = useState<string>('1000 Words')
    const [tenThousandWords, settenThousandWords] = useState<string>('10,000 Words')
    const [oneHundredThousandWords, setOneHundredThousandWords] = useState<string>('100,000 Words')
    const [oneMillionWords, setOneMillionWords] = useState<string>('1,000,000 Words')
    const [wordIsGenerated, setWordIsGenerated] = useState<boolean>(false)


    const handleChange = (value: string) => {
        const originalWord = 'I want ice-cream only when I wake up'
        let repeatCount
        let repeatedWords

        if(value === '100 Words'){
            repeatCount = Math.floor(100 / originalWord.split(' ').length);
            repeatedWords = Array(repeatCount).fill(originalWord).join(' ');
            setWords(repeatedWords)
            setWordIsGenerated(true)
        }else if(value === '300 Words'){
            repeatCount = Math.floor(300 / originalWord.split(' ').length);
            repeatedWords = Array(repeatCount).fill(originalWord).join(' ');
            setWords(repeatedWords)
            setWordIsGenerated(true)
        }else if(value === '500 Words'){
            repeatCount = Math.floor(500 / originalWord.split(' ').length);
            repeatedWords = Array(repeatCount).fill(originalWord).join(' ');
            setWords(repeatedWords)
            setWordIsGenerated(true)
        }else if(value === '1000 Words'){
            repeatCount = Math.floor(1000 / originalWord.split(' ').length);
            repeatedWords = Array(repeatCount).fill(originalWord).join(' ');
            setWords(repeatedWords)
            setWordIsGenerated(true)
        }else if(value === '10,000 Words'){
                repeatCount = Math.floor(10000 / originalWord.split(' ').length);
                repeatedWords = Array(repeatCount).fill(originalWord).join(' ');
                setWords(repeatedWords)
                setWordIsGenerated(true)
        }else if(value === '100,000 Words'){
                repeatCount = Math.floor(100000 / originalWord.split(' ').length);
                repeatedWords = Array(repeatCount).fill(originalWord).join(' ');
                setWords(repeatedWords)
                setWordIsGenerated(true)
        }else if(value === '1,000,000 Words'){
                repeatCount = Math.floor(1000000 / originalWord.split(' ').length);
                repeatedWords = Array(repeatCount).fill(originalWord).join(' ');
                setWords(repeatedWords)
                setWordIsGenerated(true)
        }else{
                setWords('I want ice-cream only when I wake up')
            }

    }
    

  return (
    <div className=''>
    <Popover>
      <PopoverTrigger  asChild>
        <Button variant="outline" className='bg-blue-500 rounded-2xl text-white hover:text-white hover:bg-blue-500' >
            Generate Words</Button>
      </PopoverTrigger>
      <div className=''>
      <PopoverContent className="w-96 bg-blue-500 text-white flex flex-col justify-center items-center">
        <div>
         {wordIsGenerated?
         <div>
            <CopyButton textToCopy={words} />
         </div>:null
         }
        <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select number of words to generate"  />
      </SelectTrigger>
      <SelectContent className="bg-blue-500 text-white">
        <SelectGroup>
            
          <SelectLabel>Choose word count</SelectLabel>
          <SelectItem value={oneHundredWords} className=''>100 words</SelectItem>
          <SelectItem value={threeHundredWords}>300 words</SelectItem>
          <SelectItem value={fiveHundredWords}>500 word</SelectItem>
          <SelectItem value={oneThousandWords}>1000 words</SelectItem>
          <SelectItem value={tenThousandWords}>10,000 words</SelectItem>
          <SelectItem value={oneHundredThousandWords}>100,000 words</SelectItem>
          <SelectItem value={oneMillionWords}>1,000,000 words</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>
     {/* Words */}
     <ScrollableTextArea text={words} />
      </PopoverContent>
      </div>
    </Popover>

   
    </div>
  )
}

export default WordGenerator
