import { useContext } from "react";
import { ModalContext } from "../context/ConfirmContext";

export function useModalConfirm() {
  const { modalConfirm, setModalConfirm } = useContext(ModalContext);

  const showConfirm = (title, onSuccess = () => { }) => {
    setModalConfirm({ show: true, title, onSuccess, onCancel: hideConfirm });
  }

  const hideConfirm = () => {
    setModalConfirm(prev => ({ ...prev, show: false }))
  }

  return { modalConfirm, showConfirm, hideConfirm }
}