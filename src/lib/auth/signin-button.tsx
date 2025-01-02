import { Button } from "@mui/material"
import { signIn } from "../auth"

export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server"
        const email = formData.get("email")
        const password = formData.get("password")
        console.log(email, password)
        const data = await signIn("credentials", {
          email,
          password,
          redirectTo: "/"
        })
      }}
      className="w-[100wh] h-[100vh] bg-[#EFEEFB]  flex items-center justify-center"
    >
      <div className="h-auto min-h-[300px] w-[380px] bg-[#FFFFFF] p-6 rounded-[12px] shadow-lg">
        <div className="flex gap-4 mb-3">
          <div>i</div>  {/* logo */}
          <div className="font-bold text-[16px] text-[#6623e3]">Blogger</div>
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
        <input className="p-2 w-full rounded-[5px] border-1 mb-3" name="email" type="text" />
        <div className="text-[13px] text-[#484759] font-medium mb-2">
          Password
        </div>
        <input className="p-2 w-full rounded-[5px] border-1 mb-3 " name="password" type="password" />
        <p className="text-end underline text-[#353448] text-[14px] font-bold cursor-pointer mb-4">Forgot Password?</p>
        <div className="flex justify-center">
          <Button type="submit" className="w-full py-[10px] rounded-md border-none text-[#ffffff] capitalize font-semibold bg-[blue] mb-3">Log In</Button>
        </div>
        <div className="w-full h-[1px] bg-[#4c4c4e] mb-3"></div>
        <div className="flex justify-center">
          <Button className="w-full py-[10px] rounded-md border-none text-black capitalize font-semibold bg-[#EFEEFB]" onClick={async () => {
            "use server"
            await signIn("google", { redirectTo: "/" }
            )
          }}>Signin with Google</Button>
        </div>
      </div>
    </form>
  )
}