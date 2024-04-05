import {
  CheckIcon,
  DocumentMagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userTasks } from '../../redux/features/tasks/tasksSlice';
import TaskDetailsModal from './TaskDetailsModal';
import { useGetTasksQuery, useUpdateTaskMutation } from '../../redux/features/tasks/taskApi';


const MyTasks = () => {
  const {data: dBTasks} = useGetTasksQuery();
  const { tasks, userSpecificTasks } = useSelector((state) => state.tasksSlice);
  const { name: userName } = useSelector((state) => state.usersSlice);
  const dispatch = useDispatch();
  // console.log(userName);
  // console.log(tasks);
  // console.log(userSpecificTasks);
  const [updateTask, { data: updateData, error: updateError }] = useUpdateTaskMutation();  
  console.log('updateData', updateData);
  console.log('updateError', updateError);
  
  const [isOpen, setIsOpen] = useState(false);
  const [taskId, setTaskId] = useState(0);
  
  useEffect(() => {
    dispatch(userTasks({userName, dBTasks}));
  }, [userName, tasks, dispatch, dBTasks]);
  
  const handleModal = (id) => {
    setTaskId(id);
    setIsOpen(!isOpen);
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
  
  return (
    <div>
      <TaskDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} id={taskId}></TaskDetailsModal>
      <h1 className="text-xl my-3">My Tasks</h1>
      <div className=" h-[750px] overflow-auto space-y-3">
        {userSpecificTasks?.map((item) => (
          <div
            key={item?._id}
            className="bg-secondary/10 rounded-md p-3 flex justify-between"
          >
            <h1>{item?.title}</h1>
            <div className="flex gap-3">
              <button onClick={() => handleModal(item._id)} className="grid place-content-center" title="Details">
                <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary" />
              </button>
              <button onClick={() => handleUpdate(item._id, {status: "done"})} className="grid place-content-center" title="Done">
                <CheckIcon className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
