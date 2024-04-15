import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useLanguage } from "../hooks/useLanguage";

export default function NotFound() {
  const { texts: TEXT } = useLanguage();

  useEffect(() => {
    console.error(`GET ${location.href} 404 (Not found)`);
  }, []);

  return (
    <section className="text-white font-medium flex flex-col items-center">
      <span className="text-7xl text-purple-500 font-bold">404</span>
      <h1 className="text-2xl min-[350px]:text-3xl sm:text-4xl text-center mb-4">
        {TEXT.notFound?.title}
      </h1>

      <Link
        to={"/"}
        className="pr-3 pl-5 py-2 rounded-lg btn-primary border-2 border-transparent text-white"
      >
        <span className="fa-solid fa-arrow-left mr-2 animate-[arrowRight_1.5s_infinite]"></span>
        {TEXT.notFound?.back}
      </Link>
    </section>
  );
}
