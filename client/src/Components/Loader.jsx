import "../css/Loader.css";
import { Triangle } from "react-loader-spinner";
const Loader = () => {
  return (
    <Triangle
      height="120"
      width="120"
      color="#000"
      ariaLabel="triangle-loading"
      visible={true}
    />
  );
};

export default Loader;
