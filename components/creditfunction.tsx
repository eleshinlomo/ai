

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export interface CreditCountType {
credits: number | any;
plan: string
}

  export const creditFunction = async ()=>{

    const sessionid = localStorage.getItem('sessionid')
  
    if(!sessionid) return
    try{
    const response: any = await fetch(`${BASE_URL}/getcredit/`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'sessionid': sessionid,
  
      }
    })
    if(!response)throw new Error("No response from server")
    const dataResponse = await response.json()
    if(dataResponse.message.ok){
      return dataResponse
    }else{
      console.log(dataResponse.message.error)
      return dataResponse.message.error
    }
  }
  catch(err: any){
    console.log(err)
  }
  }





 

  