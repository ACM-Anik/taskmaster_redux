import { ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRemoveTaskMutation, useUpdateTaskMutation } from '../../redux/features/tasks/taskApi';




const TaskCard = ({ task }) => {

  const [updateTask, {data, updateError}] = useUpdateTaskMutation();

  const [removeTask, {removeData, removeError}] = useRemoveTaskMutation();

  // console.log('data', data);
  // console.log('updateError', updateError);
  console.log('removeData', removeData);
  console.log('removeError', removeError);

  const handleUpdate = (id, updatedStatus) => {
    const data = {
      status: updatedStatus,
    };
    const options = {
      id: id,
      data: data,
    };

    updateTask(options);
  };

  const handleRemove = (id) => {
    // const data = {
    //   status: updatedStatus,
    // };
    // const options = {
    //   id: id,
    //   data: data,
    // };

    removeTask(id);
  };

  let updatedStatus;
  if (task.status === "pending") {
    updatedStatus = "running";
  }else if (task.status === "running") {
    updatedStatus = "done";
  } else {
    updatedStatus = "archive";
  }
  
  
  return (
    <div className="bg-secondary/10 rounded-md p-5">
      <h1
        className={`text-lg font-semibold mb-3  ${task.priority === 'high' ? 'text-red-500' : ''
          } ${task.priority === 'medium' ? 'text-yellow-500' : ''} ${task.priority === 'low' ? 'text-green-500' : ''
          }`}
      >
        {task?.title}
      </h1>
      <p className="mb-3">{task?.description}</p>
      <p className="text-sm">Assigned to - {task?.assignedTo}</p>
      <div className="flex justify-between mt-3">
        <p>{task?.date}</p>
        <div className="flex gap-3">
          <button 
          // onClick={() => dispatch(removeTask(task.id))} 
          onClick={() => handleRemove(task._id)}
          title="Delete">
            <TrashIcon className="h-5 w-5 text-red-500" />
          </button>
          <button onClick={() => handleUpdate(task._id, updatedStatus)} title="In progress">
            <ArrowRightIcon className="h-5 w-5 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
