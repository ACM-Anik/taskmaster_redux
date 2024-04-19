import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import { useUpdateUserMutation } from "../../redux/features/users/usersApi";

const UpdateUserModal = ({ isOpen, setIsOpen, id, modalUser }) => {
    const { register, handleSubmit, reset } = useForm();
    const [updateUser, { data: updateData, error: updateError }] = useUpdateUserMutation();
    console.log('updateData', updateData);
    console.log('updateError', updateError);

    // Update user:-
    const onSubmit = (data) => {
        const lowerCaseRole = data.role.toLowerCase();

        const newData = {
            role: lowerCaseRole,
        };
        const options = {
            id: id,
            data: newData,
        };
        updateUser(options);
        onCancel();
    };

    const onCancel = () => {
        reset();
        setIsOpen(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={"Update Member(User)"}
        >
            <div className="flex justify-start items-center gap-3">
                <div className="flex flex-col mb-5 mt-5">
                    <div className="h-28 w-28 m-2 rounded-xl overflow-hidden">
                        <img
                            src={modalUser?.photoURL}
                            alt="member photo"
                            className="object-cover h-full w-full"
                        />
                    </div>
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="title" className="mb-2">
                        Name: <span className="font-semibold">{modalUser?.name}</span>
                    </label>
                    <label htmlFor="title" className="mb-2">
                        Email: <span className="font-semibold">{modalUser?.email}</span>
                    </label>
                </div>
            </div>
            {/* Calling the modal with a form as children:-------- */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-5">
                    <label htmlFor="title" className="mb-2">
                        Role
                    </label>
                    <input
                        className="w-full rounded-md"
                        type="text"
                        id="role"
                        {...register('role')}
                        placeholder={`${modalUser.role ? modalUser.role : "Not has any role yet!"}`}
                        defaultValue={modalUser?.role}
                    />
                </div>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={() => onCancel()}
                        type="button"
                        className="btn btn-danger "
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary ">submit</button>
                </div>
            </form>
        </Modal>
    );
};

export default UpdateUserModal;