import Icon from "@/components/atoms/icon";
import Button from "@/components/atoms/button";
import { useEffect } from "react";
export type ModalProps = {
  children: React.ReactNode;
  onClick: () => void;
  deleteHandler?: (id: number) => void;
};
export const Modal: React.FC<ModalProps> = ({
  children,
  onClick,
  deleteHandler,
}) => {
  useEffect(() => {
    const modal = document.querySelectorAll(".m-modal");
    modal.forEach((item) => {
      const closeButton = item?.querySelector(".m-modal__close");
      closeButton?.addEventListener("click", function () {
        // if (!item) return;
        (item as HTMLDivElement).style.display = "none";
      });
    });
  }, []);

  return (
    <div className="m-modal">
      <div className="m-modal__contents">
        <span className="m-modal__close">
          <Icon iconName="cross" />
        </span>
        {children}
        <div className="m-modal__comboButtons">
          <span className="m-modal__button">
            <Button>Cancel</Button>
          </span>
          <Button onClick={onClick}>Yes</Button>
        </div>
      </div>
    </div>
  );
};
