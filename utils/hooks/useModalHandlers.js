import { useState } from "react";

export default function useModalHandlers() {
  const [isModalShown, setModalShow] = useState(false);

  function handleOpenModal() {
    setModalShow(true);
  }
  function handleCloseModal() {
    setModalShow(false);
  }

  return [isModalShown, handleOpenModal, handleCloseModal];
}