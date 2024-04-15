import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useLanguage } from "../hooks/useLanguage";

export default function Home() {
  const { texts: TEXT } = useLanguage();

  return (
    <>
      <Helmet title={TEXT.titles?.home} />
      <h1 className="text-5xl sm:text-6xl leading-[60px] font-bold text-white w-fit flex items-center">
        <img
          src="/logo.png"
          alt="Boardify logo"
          title="Boardify logo"
          className="h-12 min-w-9 sm:h-14 select-none mr-0.5"
          draggable="false"
        />
        <span>oard</span>
        <span className="text-purple-400 border-none">ify</span>
      </h1>

      <section className="text-slate-200 sm:text-lg font-medium mt-8 px-2 max-w-[800px]">
        <p className="mb-8 text-center">{TEXT.home?.description}</p>

        <div className="flex flex-col min-[345px]:flex-row items-center justify-center gap-4 select-none ">
          <Link
            to={"/boards"}
            className="pl-3 pr-5 py-2 rounded-lg btn-primary border-2 border-transparent text-white"
          >
            {TEXT.home?.start}

            <span className="fa-solid fa-arrow-right ml-2 animate-[arrowLeft_1.5s_infinite]"></span>
          </Link>
        </div>
      </section>
    </>
  );
}
