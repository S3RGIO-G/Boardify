import Button from "./Button";

export default function ButtonFav({ fav, onClick, className, classIcon }) {
  const classFav = fav ? "fa-solid text-yellow-300" : "fa-regular";

  return (
    <Button
      className={className}
      icon="fa-star"
      classIcon={`${classIcon} ${classFav}`}
      onClick={onClick}
    ></Button>
  );
}
