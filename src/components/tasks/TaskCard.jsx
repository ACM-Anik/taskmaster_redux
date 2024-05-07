import { ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRemoveTaskMutation, useUpdateTaskMutation } from '../../redux/features/tasks/taskApi';
// import { useEffect } from 'react';


const TaskCard = ({ task }) => {
  const [updateTask, { data: updateData, error: updateError }] = useUpdateTaskMutation();
  if (updateData) {
    console.log('updateData', updateData);
  }
  if (updateError) {
    console.log('updateError', updateError);
  }

  const [removeTaskMutation, { data: removeData, error: removeError }] = useRemoveTaskMutation();
  if (removeData) {
    console.log('removeData', removeData);
  }
  if (removeError) {
    console.log('removeError', removeError);
  }

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

  // Changing the status:-
  let updatedStatus;
  if (task.status === "pending") {
    updatedStatus = "running";
  } else if (task.status === "running") {
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
            onClick={() => removeTaskMutation(task._id)}
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
