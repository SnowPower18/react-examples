import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>React Examples</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#02296d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            React Examples
          </h1>
          <div className="grid w-2/3 grid-cols-1 grid-rows-1 gap-4 sm:grid-cols-2 md:gap-8">
            <div className="flex max-w-md flex-col rounded-md border-0 bg-white/25 p-4">
              <h2 className="text-xl font-bold text-white">DarkMode</h2>
              <p className="pt-4 text-white/70">
                Theme switcher using the dark class fromTailwind CSS and
                MatchMediaLists
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
