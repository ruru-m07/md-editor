import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="mx-10 lg:mx-56">
      <Navbar />
      <section className=" h-screen flex items-center justify-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          let&apos;s get started
        </h1>
      </section>
    </main>
  );
}
