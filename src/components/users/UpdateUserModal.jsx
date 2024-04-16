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
        console.log('data', data);

        const newData = {
            name: data.name,
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-5">
                    <label htmlFor="title" className="mb-2">
                        Name
                    </label>
                    <input
                        className="w-full rounded-md"
                        type="text"
                        id="name"
                        {...register('name')}
                        defaultValue={modalUser?.name}
                    />
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="title" className="mb-2">
                        Email
                    </label>
                    <input
                        className="w-full rounded-md"
                        type="email"
                        id="email"
                        value={modalUser?.email}
                        {...register('email')}
                    />
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="title" className="mb-2">
                        PhotoURL
                    </label>
                    <input
                        className="w-full rounded-md"
                        type="text"
                        id="photoURL"
                        {...register('photoURL')}
                        defaultValue={modalUser?.photoURL}
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