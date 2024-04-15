import { Link } from "react-router-dom";

import Card from "./Card";
import ButtonFav from "../../Forms/Form/Elements/Button/ButtonFav";

export default function CardBoard({ board, updateBoard }) {
  const { id, name, fav } = board;

  const onFav = (e) => {
    e.preventDefault();
    updateBoard(board.id, { fav: !board.fav });
  };

  return (
    <Card className="btn-primary p-3 font-bold">
      <Link to={`/boards/${id}`}>
        <div className="flex flex-col h-full justify-between text-white sm:text-lg">
          <div className="block w-full overflow-hidden text-ellipsis">
            {name}
          </div>

          <div className="flex justify-end">
            <ButtonFav
              fav={fav}
              classIcon="text-2xl cursor-pointer hover:scale-125 transition-all"
              className="flex"
              onClick={onFav}
            />
          </div>
        </div>
      </Link>
    </Card>
  );
}
