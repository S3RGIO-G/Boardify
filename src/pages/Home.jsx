import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

export function Home() {
  const {
    texts: { home: TEXT },
  } = useLanguage();

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      <h1 className="text-5xl sm:text-6xl font-bold text-white w-fit flex">
        <img
          src="/logo.png"
          alt="logo"
          className="h-[60px] select-none mr-0.5"
        />
        <span>oard</span>
        <span className="text-purple-500 border-none">ify</span>
      </h1>

      <section className="text-slate-200 sm:text-lg font-medium mt-8 px-2 max-w-[800px]">
        <p className="mb-8 text-center">{TEXT?.description}</p>

        <div className="flex flex-col min-[345px]:flex-row items-center justify-center gap-4 select-none">
          <Link
            to={"/boards"}
            className="px-4 py-2 rounded-lg bg-purple-500 text-white border-2 border-transparent hover:bg-purple-600 hover:border-slate-100 flex items-center gap-2"
          >
            {TEXT?.start}
            <span className="fa-solid fa-arrow-right text-sm relative top-0.5"></span>
          </Link>
        </div>
      </section>
    </>
  );
}
