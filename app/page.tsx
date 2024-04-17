"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Perview from "@/components/Perview";
import TextBox from "@/components/TextBox";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState<string | null>(null);

  return (
    <main className="mx-10 lg:mx-20">
      <Navbar />
      <section className="h-screen py-10">
        <div className=" h-full py-10 flex items-center justify-center">
          <Card className="flex bg-primary-foreground/40 h-full w-full mt-5">
            <TextBox text={text} setText={setText} />
            <Perview text={text} />
          </Card>
        </div>
        <Footer />
      </section>
    </main>
  );
}
