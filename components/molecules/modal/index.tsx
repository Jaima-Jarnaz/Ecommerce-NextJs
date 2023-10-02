import Icon from "@/components/atoms/icon";
import Button from "@/components/atoms/button";
import { useEffect } from "react";
export type ModalProps = {
  children: React.ReactNode;
  cancelHandler: () => void;
  deleteHandler: () => any;
};
export const Modal: React.FC<ModalProps> = ({
  children,
  cancelHandler,
  deleteHandler,
}) => {
  const onClose = () => {
    cancelHandler();
  };

  const onDelete = () => {
    deleteHandler();
  };
  return (
    <div className="m-modal">
      <div className="m-modal__contents">
        <span className="m-modal__close" onClick={onClose}>
          <Icon iconName="cross" />
        </span>
        {children}
        <div className="m-modal__comboButtons">
          <span className="m-modal__button">
            <Button type="primary" onClick={onClose}>
              Cancel
            </Button>
          </span>
          <Button type="primary" onClick={onDelete}>
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};
