import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

export default function NotFound() {
  const { texts: {notFound: TEXT} } = useLanguage();
  useEffect(() => {
    console.error(`GET ${location.href} 404 (Not found)`);
  }, []);

  return (
    <section className="text-white font-medium flex flex-col items-center">
      <span className="text-7xl text-purple-500 font-bold">404</span>
      <h1 className="text-2xl min-[350px]:text-3xl sm:text-4xl text-center mb-4">{TEXT?.title}</h1>

      <Link
        to={"/"}
        className="px-4 py-2 rounded-lg bg-purple-500 border-2 border-transparent hover:bg-purple-600 hover:border-slate-100 text-sm min-[350px]:text-base"
      >
        <span className="fa-solid fa-arrow-left mr-2"></span>
        {TEXT?.back}
      </Link>
    </section>
  );
}
