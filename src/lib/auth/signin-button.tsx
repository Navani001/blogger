"use client"
import { Button } from "@mui/material"
import { cn } from "@nextui-org/theme"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"

export function SignIn() {
  const [error, setError] = useState("")

  const handleSubmit = async (formData: FormData) => {
   
      const email = formData.get("email")
      const password = formData.get("password")
      
      signIn("credentials", {
        email,
        password,
        redirect: false
      })
      .then(result => {
        if (result?.error) {
          setError(result.error)
        } else {
          window.location.href = "/"
        }
      })
      .catch(err => {
        console.error("Error during sign in:", err)
        setError("Failed to sign in")
      })
    
  }
  return (

    <form
    onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(new FormData(e.currentTarget))
      }}
      className="w-[100wh] h-[100vh] bg-[#EFEEFB]  flex items-center justify-center"
    >
      <div className="h-auto min-h-[300px] w-[380px] bg-[#FFFFFF] p-6 rounded-[12px] shadow-lg">
        <div className="flex gap-1 mb-3">
          <div><Image width={20} height={20} alt="icon" src="/android-chrome-192x192.png"></Image></div>  {/* logo */}
          <div className="font-semibold text-[16px] ">Blogix</div>
        </div>
        <div className="font-bold text-[20px] mb-1">
          Welcome!
        </div>
        <div className="text-[13px] text-[#71707E] font-medium mb-6">
          One positive feedback per day or week can make us grow exponentially
        </div>
        <div className="text-[13px] text-[#484759] font-medium mb-2">
          Email
        </div>
        <input className={cn("p-2 w-full rounded-[5px] border-1 mb-3 ",{'border-red-300':error!=""})} name="email" type="text" onChange={()=>{setError('')}}/>
        <div className="text-[13px] text-[#484759] font-medium mb-2">
          Password
        </div>
        <input className={cn("p-2 w-full rounded-[5px] border-1 mb-3 ",{'border-red-300':error!=""})} name="password" type="password" onChange={()=>{setError('')}} />
        <p className="text-end underline text-[#353448] text-[14px] font-bold cursor-pointer mb-4">Forgot Password?</p>
        {error && (
        <p className="text-red-500 text-sm mb-3">{error}</p>
      )}
        <div className="flex justify-center">
          <Button type="submit" sx={{backgroundColor:'blue' , color:'#ffffff' , marginBottom:'12px' ,fontWeight:'600' , textTransform:'none'}} className="w-full py-[10px] rounded-md border-none ">Log In </Button>
        </div>
        <div className="w-full h-[1px] bg-[#4c4c4e] mb-3"></div>
        <div className="flex justify-center">
          <Button sx={{backgroundColor:'#EFEEFB' , color:'black' , marginBottom:'12px' ,fontWeight:'600' , textTransform:'none'}} className="w-full py-[10px] rounded-md border-none" onClick={async () => {
      
            await signIn("google", { redirectTo: "/" }
            )
          }}>Signin or login with Google</Button>
        </div>
      </div>
    </form>
    
    
  )
}


// import { Button } from "@mui/material"
// import { signIn } from "../auth"
// import Image from "next/image"

// export function SignIn() {
//   return (

//     <form
//       action={async (formData) => {
//         "use server"
//         const email = formData.get("email")
//         const password = formData.get("password")
//         console.log(email, password)
//         try{
//         const data = await signIn("credentials", {
//           email,
//           password,
//           redirectTo: "/"
//         })}
//         catch(err) {
//           console.error("Error during sign in:", err)
    

//         }
//       }}
//       className="w-[100wh] h-[100vh] bg-[#EFEEFB]  flex items-center justify-center"
//     >
//       <div className="h-auto min-h-[300px] w-[380px] bg-[#FFFFFF] p-6 rounded-[12px] shadow-lg">
//         <div className="flex gap-1 mb-3">
//           <div><Image width={20} height={20} alt="icon" src="/android-chrome-192x192.png"></Image></div>  {/* logo */}
//           <div className="font-semibold text-[16px] ">Blogix</div>
//         </div>
//         <div className="font-bold text-[20px] mb-1">
//           Welcome!
//         </div>
//         <div className="text-[13px] text-[#71707E] font-medium mb-6">
//           One positive feedback per day or week can make us grow exponentially
//         </div>
//         <div className="text-[13px] text-[#484759] font-medium mb-2">
//           Email
//         </div>
//         <input className="p-2 w-full rounded-[5px] border-1 mb-3" name="email" type="text" />
//         <div className="text-[13px] text-[#484759] font-medium mb-2">
//           Password
//         </div>
//         <input className="p-2 w-full rounded-[5px] border-1 mb-3 " name="password" type="password" />
//         <p className="text-end underline text-[#353448] text-[14px] font-bold cursor-pointer mb-4">Forgot Password?</p>
//         <div className="flex justify-center">
//           <Button type="submit" sx={{backgroundColor:'blue' , color:'#ffffff' , marginBottom:'12px' ,fontWeight:'600' , textTransform:'none'}} className="w-full py-[10px] rounded-md border-none ">Log In </Button>
//         </div>
//         <div className="w-full h-[1px] bg-[#4c4c4e] mb-3"></div>
//         <div className="flex justify-center">
//           <Button sx={{backgroundColor:'#EFEEFB' , color:'black' , marginBottom:'12px' ,fontWeight:'600' , textTransform:'none'}} className="w-full py-[10px] rounded-md border-none" onClick={async () => {
//             "use server"
//             await signIn("google", { redirectTo: "/" }
//             )
//           }}>Signin or login with Google</Button>
//         </div>
//       </div>
//     </form>
    
    
//   )
// }