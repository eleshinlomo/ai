
const BASE_URL = process.env.NEXT_PUBLIC_FAST_API_BASE_URL

export const textToVoice = async (textMessage: any)=>{
    const payload = {
        "text_message": textMessage
    }
  try{
    if(!textMessage) throw new Error("No text to convert")
     
    const response: any = await fetch(`${BASE_URL}/texttovoice`, {
      mode: 'cors',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)

    })

    if(!response) throw new Error("No response from server")
    const blob = await response.blob()
    if(blob){
        console.log(blob)
        return blob
    }else{
    console.log(response.error)
    return response.error
    }
   }
    catch(error){
    console.log(error)
    return {"error": "No response from server.Check internet connection and console"}
    }
  }