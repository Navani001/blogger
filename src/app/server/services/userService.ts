"use server";
import { neon } from "@neondatabase/serverless";
export async function getUserFromDb(email: any, password: any) {


  // Connect to the Neon database
  const sql = neon(`${process.env.DATABASE_URL}`);

  // Insert the comment from the form into the Postgres database
  const result = await sql("SELECT * FROM login WHERE email = $1", [email]);
 if(result[0].password ===password){
    console.log("hi data to be send",result[0])
    return {
        name:result[0].username,
        email: result[0].email,
        id:parseInt(result[0].id)
    }
 }



  return null; //(4)
}
