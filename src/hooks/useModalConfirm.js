import { useContext, useEffect } from "react";
import { ModalContext } from "../context/ConfirmContext";

export function useModalConfirm({ initialValue = false } = {}) {
  const { modalConfirm, setModalConfirm } = useContext(ModalContext);

  useEffect(() => {
    if (initialValue) setModalAttributes();
  }, [])


  const setModalAttributes = (show = false, title = '', onSuccess = () => { }) => {
    setModalConfirm({ show, title, onSuccess, onCancel: hideModal })
  }

  const hideModal = () => {
    setModalConfirm(prev => ({ ...prev, show: false }))
  }

  return { modalConfirm, setModalAttributes, hideModal }
}