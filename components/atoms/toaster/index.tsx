import Image from "next/image";

export interface ToasterProps {
  type: string;
  message: string;
}

const Toaster: React.FC<ToasterProps> = ({ type, message }) => {
  return (
    <div
      className={`a-toaster ${
        type === "success" ? "a-toaster--bgGreen" : "a-toaster--bgRed"
      }`}
    >
      <div className={`a-toaster__container`}>
        <div
          className={`a-toaster__icon ${
            type === "success" ? "checkGreen" : "closeRed"
          }`}
        ></div>
        <p
          className={`a-toaster__message ${
            type == "success"
              ? "a-toaster__message--success"
              : "a-toaster__message--fail"
          }`}
        >
          {message}
        </p>
      </div>

      <div
        className={`a-toaster__progress  ${
          type == "success"
            ? "a-toaster__progress--success"
            : "a-toaster__progress--fail"
        }`}
      ></div>
    </div>
  );
};

export default Toaster;
