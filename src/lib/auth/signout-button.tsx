// import { signOut } from "@/auth.ts"

import { signOut } from "../auth"

 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit" className="bg-gray-200 rounded-lg p-1 pr-2 pl-2">Sign Out</button>
    </form>
  )
}