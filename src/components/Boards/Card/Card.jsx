import { forwardRef } from "react";

function CardContainer({ className = "", children, onClick = () => {} }, ref) {
  return (
    <li
      ref={ref}
      className={`w-full min-[500px]:w-[calc(50%-4px)] md:w-[calc(33%-3.75px)] lg:w-[calc(25%-6px)] select-none h-[150px] rounded-md ${className}`}
      onClick={onClick}
    >
      {children}
    </li>
  );
}

const Card = forwardRef(CardContainer);
export default Card;
