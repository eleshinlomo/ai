export const BASE_URL: any = process.env.NEXT_PUBLIC_BASE_URL
export const GOOGLE_LOGIN_URL: any = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL
export const GOOGLE_LOGOUT_URL: any = process.env.NEXT_PUBLIC_SSO_LOGOUT_URL
export const loginURL: any = process.env.NEXT_PUBLIC_SSO_DJANGO_LOGIN_URL

export const Company = ()=>{
if(typeof window !== undefined){
const company = localStorage.getItem('company')
return company
}
}

