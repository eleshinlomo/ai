import { useContext, useState } from "react"
import Link from "next/link"

const GetStartedButton = ()=>{

  const [isLoggedIn, setIsloggedIn] = useState(false) 

  return (

    <div className="text-white">
                {isLoggedIn?
                <Link href='/dashboard/dashboardpage'>
                <button className="py-2 px-4 my-4 bg-gray-600 rounded-2xl ">Dashboard</button></Link>:
                <Link href='/authpages/signuppage'>
                <button className="py-2 px-4 my-4 bg-gray-600 rounded-2xl">Get started</button></Link>
                }
    </div>
  )
}

export default GetStartedButton 

