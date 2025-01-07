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
      <button type="submit" className="bg-blue-400 rounded-lg p-2">Sign Out</button>
    </form>
  )
}