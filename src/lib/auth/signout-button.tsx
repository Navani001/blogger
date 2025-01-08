// import { signOut } from "@/auth.ts"

import { MdLogout } from "react-icons/md"
import { signOut } from "../auth"

 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit" className="bg-gray-200 rounded-lg p-1 pr-2 pl-2 flex justify-center items-center gap-1">    <MdLogout className="h-4 w-4"/> Sign Out</button>
    </form>
  )
}