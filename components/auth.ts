import { FormEvent } from "react";


export interface LoginProps {
  email: string;
  password: string;
}

interface PassMatchProps {
  password: string;
  repassword: string;
}

export interface PayloadProps {
  payload: object;
}



const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


export const passMatch = ({password, repassword}: PassMatchProps)=>{
  if(password !== repassword){
    return 'Password must match'
  }
  return null
}


export const registerAPI = async ({payload}: PayloadProps)=>{

  const response = await fetch("/api/registeruser/", {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })

  if(!response) throw new Error('No response from the server')
  const data = response.json()
  return data
}

// Get csrf token from headers(if available)
// Get csrf token from cookies (if available)
export const getCsrfTokenFromHeader = () => {
  const csrfToken = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('csrftoken='))
    ?.split('=')[1];  // Extract the token value after '='

  if (!csrfToken) {
    console.error('CSRF token not found in cookies');
    return ''

  }

  localStorage.setItem('csrftoken', csrfToken)
  return csrfToken;
};



// This fetches csrf before login
export const fetchCsrfTokenFromServer = async () => {
  const response = await fetch(`/api/getcsrf/`, {
    method: 'GET',
    mode: 'cors',
    
  });

  if (!response.ok) {
    console.log('csrf token not found')
    return {error: 'csrf token not found'}
  };
  

  const csrfToken = await response.json()
  localStorage.setItem('csrftoken', csrfToken.csrftoken)
  console.log('CSRF Token', csrfToken.csrftoken);
  return csrfToken;
};





// Login
export const loginApi = async ({payload} : PayloadProps)=>{

  console.log('LOGGING IN...')
  const csrf = await fetchCsrfTokenFromServer()
  if(!csrf) throw new Error('csrf token not found')
  try{
 console.log('CSRF FOUND IN LOGIN', csrf)
 const response = await fetch(`/api/loginuser/`, {
  method: 'POST',
  mode: 'cors',
  credentials: 'include',
  headers: {
    
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrf
    

  },
  body: JSON.stringify(payload)
 })

 if(!response) throw new Error('No response from server')
  const data: any = await response.json()
  return data
}catch(err){
  console.log(err)
}
}






// Login Checker
export const loginChecker = async ()=>{
  const csrf = getCsrfTokenFromHeader()
  if(!csrf || csrf === '') return
  console.log('CSRF FOUND IN LOGIN CHECKER', csrf)
  const response = await fetch(`/api/loginchecker/`, {
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': csrf

    },
    
  })

  if(!response) throw new Error('No response from server')
  const data = await response.json()
  console.log(data)
  return data
}

// Delete a cookie
export const deleteCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; Max-Age=0; path=/; domain=localhost; SameSite=Strict;`;
};

// Logout
export const logoutApi = async ()=>{
  const csrf = localStorage.getItem('csrftoken')
  console.log('LOGOUT CSRF', csrf)
  if(!csrf) return 'csrf token not found'
  const response = await fetch(`/api/logoutuser/`, {
   method: 'POST',
   mode: 'cors',
   headers: {
     
     'Content-Type': 'application/json',
     'X-csrfToken': csrf
     
   },
   body: JSON.stringify({'message': 'Logging out'})
  })
 
  if(!response) throw new Error('No response from server')
   const data: any = await response.json()
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    localStorage.removeItem('csrftoken')
    deleteCookie('csrftoken')
    deleteCookie('session')
    window.location.href = '/authpages/logoutlandingpage'
    return
   
 }

 export const resetPassowrd = (email: string)=>{
    return {message: 'Checking email'}
 }
 
 





