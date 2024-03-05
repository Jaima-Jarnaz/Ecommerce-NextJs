interface LoaderProps {
  type?: string;
}
const Loader: React.FC<LoaderProps> = ({ type }) => {
  return (
    <div className={`a-loader ${type === "half" ? "a-loader--half" : ""}`}>
      <div className="a-loader__spinner">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
