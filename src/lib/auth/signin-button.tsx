import { signIn } from "../auth"

 
export function SignIn() {
  return (

    <form
    className="bg-[red]  flex items-center justify-center"
      action={async (formData) => {
        "use server"
        const email = formData.get("email")
        const password = formData.get("password")
       
        const data=await signIn("credentials",  {
            email,
            password,
            redirectTo: "/"
          })}}
    >
      <div className="flex items-center justify-center">
        Email
        <input name="email" type="text" />
      </div>
      <div>
        Password
        <input name="password" type="password" />
      </div>
      <button>Sign In</button>
      <button onClick={async() => {
      "use server"
      await signIn("google",{redirectTo:"/"}

      )
    }}>Signin with Google</button>
    </form>
    
    
  )
}