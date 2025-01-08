

import * as React from "react";

import ContactUs from "../contactus";
import { auth } from "../auth";

export default async function ContactBody() {
    const session = await auth();

   

  return (
    <React.Fragment>
  
     <ContactUs name={session?.user?.name} email={session?.user?.email}/>
    </React.Fragment>
  );
}
