import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Root() {
  const session = await auth.api.getSession({
    headers: headers()
  });


  if (session?.user) {
    redirect("/home");
  } else {
    redirect("/login");
  }
  return <></>
}
