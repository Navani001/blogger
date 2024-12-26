import { signIn } from "../auth"

 
export function SignIn() {
  return (
    <form
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
      <label>
        Email
        <input name="email" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
      <button onClick={async() => {
        "use server"
        await signIn("google",{redirectTo:"/"}

        )
      }}>Signin with Google</button>
    </form>
  )
}