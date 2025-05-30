import { useState } from "react";

export function useModal() {
  const [openModals, setOpenModals] = useState<Set<string>>(new Set());

  const openModal = (modalId: string) => {
    setOpenModals((prev) => new Set(prev).add(modalId));
  };

  const closeModal = (modalId: string) => {
    setOpenModals((prev) => {
      const newSet = new Set(prev);
      newSet.delete(modalId);
      return newSet;
    });
  };

  const toggleModal = (modalId: string) => {
    setOpenModals((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(modalId)) {
        newSet.delete(modalId);
      } else {
        newSet.add(modalId);
      }
      return newSet;
    });
  };

  const isOpen = (modalId: string) => openModals.has(modalId);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
}
