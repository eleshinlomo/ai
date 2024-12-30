
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const HandleImagePrompt = async (userMessage: any)=>{
    const payload = {
        "user_message": userMessage
    }
  try{
    if(!userMessage) throw new Error("no user message to send to llm")
     
    const response: any = await fetch(`${BASE_URL}/imagebotchat/`, {
      mode: 'cors',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)

    })

    if(!response) throw new Error("No response from server")
    const data = await response.json()
    if(data.message.ok){
        return data
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