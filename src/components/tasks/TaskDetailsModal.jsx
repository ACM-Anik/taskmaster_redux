import Modal from "../ui/Modal";

const TaskDetailsModal = ({isOpen, setIsOpen}) => {

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}></Modal>
    );
};

export default TaskDetailsModal;
