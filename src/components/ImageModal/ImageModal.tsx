import { Image } from "../../App.types";
import Modal from "react-modal";
import css from "./ImageModal.module.css";

interface ImageModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  image: string;
}

Modal.setAppElement("#root");

const ImageModal: React.FC<ImageModalProps> = ({
  modalIsOpen,
  closeModal,
  image,
}) => {
  return (
    <div>
      <Modal
        className={css.modal}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <img src={image} alt="Large photo" />
      </Modal>
    </div>
  );
};

export default ImageModal;
