import Modal from "../ui/Modal";
import { useGetUsersQuery } from "../../redux/features/users/usersApi";


const UserDetailsModal = ({isOpen, setIsOpen, id}) => {
    const { data: allUsers } = useGetUsersQuery();

    const user = allUsers?.find((user) => user._id === id);

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={user?.name} user={user}>
            <h1 className="text-lg">{user?.name}</h1>
            <h1 className="text-lg">{user?.email}</h1>
        </Modal>
    );
};

export default UserDetailsModal;