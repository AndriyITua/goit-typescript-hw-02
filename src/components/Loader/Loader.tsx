import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    <div className={css.loader}>
      <RotatingLines visible={loading} width="30" strokeColor="blue" />
      <p className={css.text}>loading, please wait</p>
    </div>
  );
};

export default Loader;
