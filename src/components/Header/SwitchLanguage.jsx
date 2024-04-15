import { useLanguage } from "../../hooks/useLanguage";
import Switch from "../Forms/Form/Elements/Switch";

export default function SwitchLanguage({
  langFrom = "",
  langTo = "",
  className = "",
}) {
  const { updateLanguage } = useLanguage();
  const lang = localStorage.getItem("lang");
  const isActive = lang === "en" || !lang;

  const switchLanguage = async (bool) => {
    if (bool) await updateLanguage("en");
    else await updateLanguage("es");
  };

  return (
    <div className={`flex gap-4 items-center ${className}`}>
      {langFrom}

      <Switch
        className="w-16 h-8 relative rounded-full border-2 border-slate-300 select-none"
        classActive="bg-primary"
        classDesactive="bg-white"
        classSlider="rounded-full bg-white shadow-sm shadow-black/75"
        sliderWidth={40}
        defaultValue={isActive}
        imgFrom="/flags/flag_spain.jpg"
        imgTo="/flags/flag_usa.jpg"
        onChange={switchLanguage}
      />
      {langTo}
    </div>
  );
}
