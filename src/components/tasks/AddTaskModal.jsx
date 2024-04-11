import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import { useAddTaskMutation } from "../../redux/features/tasks/taskApi";
import users from "../../assets/users.json";

const AddTaskModal = ({ isOpen, setIsOpen }) => {
    const { register, handleSubmit, reset } = useForm();
    const [addTask, { data, error }] = useAddTaskMutation();
    console.log('data', data);
    console.log('error', error);

    const onSubmit = (data) => {
        addTask({ ...data, status: "pending" });
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
            title={"Programming Hero"}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-5">
                    <label htmlFor="title" className="mb-2">
                        Title
                    </label>
                    <input
                        className="w-full rounded-md"
                        type="text"
                        id="title"
                        {...register('title')}
                    />
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="title" className="mb-2">
                        Description
                    </label>
                    <textarea
                        className="w-full rounded-md"
                        type="text"
                        id="description"
                        {...register('description')}
                    />
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="title" className="mb-2">
                        Deadline
                    </label>
                    <input
                        className="w-full rounded-md"
                        type="date"
                        id="date"
                        {...register('date')}
                    />
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="title" className="mb-2">Assign to</label>
                    <select
                        className="w-full rounded-md"
                        id="assignedTo"
                        {...register('assignedTo')}
                    >
                        {
                            users?.map((member) => <option key={member?._id} value={member?.name}>{member?.name}</option>)
                        }
                    </select>
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="title" className="mb-2">Priority</label>
                    <select
                        className="w-full rounded-md"
                        id="priority"
                        {...register('priority')}
                    >
                        <option defaultValue value="high">
                            High
                        </option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
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

export default AddTaskModal;