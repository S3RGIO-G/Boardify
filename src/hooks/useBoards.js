import { useEffect, useState } from "react";
import { addBoard, deleteBoardById, getBoardById, getBoardsByField, updateBoardById } from "../services/board.service";
import { useNavigate } from "react-router-dom";
import { useLists } from "./useLists";

export function useBoards({ idUser = null, idBoard = null } = {}) {
  const [boards, setBoards] = useState(null);
  const [board, setBoard] = useState(null);
  const { lists, deleteList } = useLists();
  const nav = useNavigate();

  useEffect(() => {
    if (idUser) loadBoards();
    if (idBoard) loadBoard();
  }, [idUser, idBoard]);

  const loadBoard = async () => {
    try {
      const res = await getBoardById(idBoard);
      setBoard(res);
    } catch (err) {
      console.error(err.message)
      nav("/boards", { replace: true });
    }
  };

  const loadBoards = async () => {
    try {
      const res = await getBoardsByField("idUser", idUser);
      res.sort((x, y) => x.name.localeCompare(y.name))
      setBoards(res);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  const createBoard = async (name, idUser) => {
    try {
      const newBoard = {
        name,
        idUser,
        created: Date.now(),
        updated: Date.now(),
        fav: false,
      };

      const { id } = await addBoard(newBoard);
      setBoards([...boards, { ...newBoard, id }])
      return id;
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const updateBoard = async (id, data) => {
    const prevBoard = board ? { ...board } : null;
    const prevState = [...boards];
    try {
      data.updated = Date.now();

      if (board) setBoard(prev => ({ ...prev, ...data }));

      const iBoard = boards.findIndex(b => b.id === id);
      if (iBoard !== -1) {
        boards[iBoard] = { ...boards[iBoard], ...data };
        setBoards([...boards]);
      }
      await updateBoardById(id, { ...data });
    }
    catch (err) {
      console.error(err.message);
      setBoards(prevState);
      setBoard(prevBoard);
    }
  }

  const deleteBoard = async (id) => {
    const prevBoard = { ...board };
    try {
      const ids = lists.map(l => l.id);
      const promises = [];
      ids.forEach(id => promises.push(deleteList(id)));
      setBoard(null)
      await Promise.all(promises);
      await deleteBoardById(id);
      nav("/boards");
    } catch (err) {
      setBoard(prevBoard)
      console.error(err.message);
    }
  }

  return { board, boards, createBoard, updateBoard, deleteBoard }
}