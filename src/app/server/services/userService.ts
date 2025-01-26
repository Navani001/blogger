"use server";
import { neon } from "@neondatabase/serverless";
export async function getUserFromDb(email: string, password: string) {


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
export async function getidFromDb(email: any,image:any,name:any) {


  // Connect to the Neon database
  const sql = neon(`${process.env.DATABASE_URL}`);

  // Insert the comment from the form into the Postgres database
  const result = await sql("  INSERT INTO login (username, email, password, avatar_url, role,preference_embedding) VALUES ($1, $2, '123', $3, 'user',(select content_embedding from blogss where id=14 )) ON CONFLICT (username) DO UPDATE SET username = EXCLUDED.username RETURNING id;", [name,email,image]);
  console.log(result)
 if(result){
    console.log("hi data to be send",result[0].id)
    return {
        id:parseInt(result[0].id)
    }
 }



  return null; //(4)
}