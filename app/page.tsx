import { Metadata } from "next";
import Login from "./login/page";

export const metadata: Metadata = {
  title: "SIPIN",
  description: "Secure Investment platform",
  
};
export default function Home() {
  return (
  <Login/>
  );
}
