import ModalOverlay from "./ModalOverlay";
import XModal from "./XModal";

import EditCategoryForm from "../forms/EditCategoryForm";

const EditCategoryPopup = ({ onClose, category }) => {
  return (
    <ModalOverlay>
      <XModal
        sizeClass="tw-w-full tw-h-full lg:tw-w-464px lg:tw-min-h-200px lg:tw-h-auto"
        onClose={onClose}
      >
        <div className="tw-flex tw-justify-center tw-items-center tw-py-20px">
          <div className="tw-leading-none tw-text-20px tw-font-medium">Edit</div>
        </div>
        <div className="tw-pt-22px tw-pb-32px tw-px-32px">
          <EditCategoryForm category={category} closeMe={onClose} />
        </div>
      </XModal>
    </ModalOverlay>
  );
};

export default EditCategoryPopup;
