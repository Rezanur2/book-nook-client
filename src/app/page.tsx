import { Button } from "@/components/ui/button";
import Logo from "../../public/assets/booknook.png";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image src={Logo} width={20} height={20} alt="BookNook" />
      <Button variant={"outline"}>ShadCN Button</Button>
      <h1>Every Book Opens a New World</h1>
      <p>Discover stories, ideas, and knowledge...</p>
    </div>
  );
}
