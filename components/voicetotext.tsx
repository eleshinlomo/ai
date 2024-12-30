
const BASE_URL = process.env.NEXT_PUBLIC_FAST_API_BASE_URL

export const voiceToText = async (e: any, fileInput: any)=>{
  try{
    e.preventDefault()
    const formData = new FormData()
    formData.append('audiofile', fileInput, 'audiofile.wav')
    
    const response = await fetch(`${BASE_URL}/voicetotext`, {
      mode: 'cors',
      method: 'POST',
      body: formData

    })

    const data = await response.json()
    if(!data) throw new Error("No response from server")
    console.log(data)
    return data
    }
    catch(error){
    console.log(error)
    return {"error": "No response from server.Check internet connection and console"}
    }
  }