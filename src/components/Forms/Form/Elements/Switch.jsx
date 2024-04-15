import { useState } from "react";

export default function Switch({
  className = "",
  classActive = "",
  classDesactive = "",
  classSlider = "",
  imgFrom = "",
  imgTo = "",
  sliderWidth = 40,
  defaultValue = false,
  onChange = () => {},
}) {
  const [active, setActive] = useState(defaultValue);

  const classDiv = `${className} ${active ? classActive : classDesactive}`;
  const styleSlider = {
    width: sliderWidth,
    left: active ? `calc(100% - ${sliderWidth - 10}px)` : -10,
  };

  const onClick = () => {
    setActive(!active);
    onChange(!active);
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all duration-200 ${classDiv}`}
    >
      <span
        className={`absolute transition-all duration-200 top-1/2 -translate-y-1/2 flex items-center justify-center aspect-square ${classSlider}`}
        style={styleSlider}
      >
        <img
          src={imgFrom}
          className="w-full max-w-[75%] rounded-[10%]"
          style={{ display: active && "none" }}
          draggable="false"
        />

        <img
          src={imgTo}
          className="w-full max-w-[75%] rounded-[10%]"
          style={{ display: !active && "none" }}
          draggable="false"
        />
      </span>
    </div>
  );
}
