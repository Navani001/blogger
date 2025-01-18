

import * as React from "react";


import { auth } from "../../../lib/utilis/auth";
import { ContactUs } from "./contact/contact";

export async function ContactBody() {
    const session = await auth();

   

  return (
    <React.Fragment>
     <ContactUs name={session?.user?.name} email={session?.user?.email}/>
    </React.Fragment>
  );
}
