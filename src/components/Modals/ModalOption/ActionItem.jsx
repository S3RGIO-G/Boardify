export default function ActionItem({
  id = "",
  text = "",
  icon = "",
  className = "",
  onClick = () => {},
}) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`btn-light flex justify-between items-center w-full px-4 text-start py-1.5 ${className}`}
    >
      {text}
      <i className={icon}></i>
    </button>
  );
}
