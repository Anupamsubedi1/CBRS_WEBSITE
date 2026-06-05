import { redirect } from "next/navigation";

// "About Us" is a dropdown-only parent — it has no standalone page.
// Anyone landing on /about is sent to the primary About sub-page.
export default function AboutIndex() {
  redirect("/about/cbrs-nepal");
}
