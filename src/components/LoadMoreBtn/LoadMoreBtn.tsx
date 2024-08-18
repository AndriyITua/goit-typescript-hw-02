import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div className={css.container}>
      <button className={css.button} type="submit" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
