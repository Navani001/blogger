

import * as React from "react";

import ContactUs from "./contact";
import { auth } from "../utilis/auth";

export default async function ContactBody() {
    const session = await auth();

   

  return (
    <React.Fragment>
  
     <ContactUs name={session?.user?.name} email={session?.user?.email}/>
    </React.Fragment>
  );
}
