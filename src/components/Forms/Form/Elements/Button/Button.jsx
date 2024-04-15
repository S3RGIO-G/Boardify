export default function Button({
  className = "",
  icon = "",
  classIcon = "",
  children,
  onClick = () => {},
}) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    
      {icon && <span className={`${icon} ${classIcon}`}></span>}
    </button>
  );
}
