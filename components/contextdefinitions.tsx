// Props for Context Window Explanation Component
export const contextWindowHeader = 'What is Context Window?'

export const contextWindowText = (
<div>
  A context window in machine learning is the amount of text that a model can use as input when generating 
  or understanding language. It is measured in tokens, which can be words or parts of words. 
  The context window is important because it helps AI models understand the syntax and semantics
   of language, which allows them to produce relevant and coherent responses.
   </div>
   )


// Props for Token Explanation
export const tokenExplanationHeader = 'What are tokens?'

export const tokenExplanationText = (
<div>
<div className='font-semibold text-lg flex flex-col gap-3'>
<p>In the context of natural language processing (NLP) 
 and machine learning (ML), a token is a single unit of text, 
often a word or a punctuation mark, obtained by splitting the 
text on whitespace or other delimiters.</p>

<p>Here is an example to illustrate what tokens are:</p>

<p>In the sentence {"'The cat is sleeping.'"}, the tokens are:
 {'"The"'}, {'"cat"'}, {'"is"'}, {'"sleeping"'}, and {'"."'}.</p>


 </div>
   </div>
   )