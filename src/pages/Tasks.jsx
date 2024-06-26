import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import MyTasks from '../components/tasks/MyTasks';
import TaskCard from '../components/tasks/TaskCard';
import { useEffect, useState } from 'react';
import AddTaskModal from '../components/tasks/AddTaskModal';
import MenuDropdown from '../components/ui/MenuDropdown';
import { useGetTasksQuery } from '../redux/features/tasks/taskApi';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../utils/firebase.config';

const Tasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  /** We can Refresh the ui by this method:--
  const {data: tasks} = useGetTasksQuery(undefined, {
    pollingInterval: 30000, //polling after 30sec (refresh)
    refetchOnMountOrArgChange: true, //Update after mounting and unmounting. (Changing interface)
  });
  // OR, setting tagProviders at the baseApi queries
  **/
  const { data: tasks } = useGetTasksQuery();

  const pendingTasks = tasks?.filter((item) => item.status === 'pending');
  const runningTasks = tasks?.filter((item) => item.status === 'running');
  const doneTasks = tasks?.filter((item) => item.status === 'done');

  // Setting the user Profile:-
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);


  return (
    <>
      <AddTaskModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></AddTaskModal>

      <div className="h-screen grid grid-cols-12 overflow-hidden">
        <div className="col-span-9 px-10 pt-10">
          {/* Navbar:----------- */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold text-3xl">Tasks</h1>
            </div>

            <div className="flex gap-5">
              <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-10 w-10  grid place-content-center text-secondary hover:text-white transition-all">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
              <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-10 w-10 grid place-content-center text-secondary hover:text-white transition-all">
                <BellIcon className="h-6 w-6" />
              </button>

              <button onClick={() => setIsOpen(!isOpen)} className="btn btn-primary">Add Task</button>

              <MenuDropdown>
                <div className="h-10 w-10 rounded-xl overflow-hidden">
                  <img
                    title={user?.displayName}
                    src={user?.photoURL ?
                      user.photoURL
                      :
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="profile"
                    className="object-cover h-full w-full "
                  />
                </div>
              </MenuDropdown>

            </div>
          </div>
          {/* Task-cards in different status:--------- */}
          <div className="grid grid-cols-3 gap-5 pt-10">
            {/* Up Next */}
            <div className="relative h-calc-100vh-20vh 2xl:h-calc-100vh-15vh overflow-y-auto overflow-x-hidden pb-8 2xl:pb-0">
              <div className="flex justify-between sticky top-0 bg-[#D3DDF9] p-5 rounded-md mb-3">
                <h1>Up Next</h1>
                <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                  {pendingTasks?.length}
                </p>
              </div>
              <div className="space-y-3">
                {pendingTasks?.map((item) => (
                  <TaskCard key={item._id} task={item} />
                ))}
              </div>
            </div>
            {/* In Progress */}
              <div className="relative h-calc-100vh-20vh 2xl:h-calc-100vh-15vh overflow-y-auto overflow-x-hidden pb-8 2xl:pb-0">
                <div className="flex justify-between sticky top-0 bg-[#D3DDF9] p-5 rounded-md mb-3">
                  <h1>In Progress</h1>
                  <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                    {runningTasks?.length}
                  </p>
                </div>
                <div className="space-y-3">
                  {runningTasks?.map((item) => (
                    <TaskCard key={item._id} task={item} />
                  ))}
                </div>
              </div>
            {/* Done */}
            <div className="relative h-calc-100vh-20vh 2xl:h-calc-100vh-15vh overflow-y-auto overflow-x-hidden pb-8 2xl:pb-0">
              <div className="flex justify-between sticky top-0 bg-[#D3DDF9] p-5 rounded-md mb-3">
                <h1>Done</h1>
                <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                  {doneTasks?.length}
                </p>
              </div>
              <div className="space-y-3">
                {doneTasks?.map((item) => (
                  <TaskCard key={item._id} task={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 border-l-2 border-secondary/20 px-10 pt-10">
          <div>
            <h1 className="text-xl">Members</h1>
            <div className="flex gap-3 mt-3">
              <div className="h-10 w-10 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt=""
                  className="object-cover h-full w-full "
                />
              </div>
              <div className="h-10 w-10 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt=""
                  className="object-cover h-full w-full "
                />
              </div>
              <div className="h-10 w-10 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt=""
                  className="object-cover h-full w-full "
                />
              </div>
              <div className="h-10 w-10 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt=""
                  className="object-cover h-full w-full "
                />
              </div>
              <div className="h-10 w-10 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                  alt=""
                  className="object-cover h-full w-full "
                />
              </div>
            </div>
          </div>
          <MyTasks />
        </div>
      </div>
    </>
  );

};

export default Tasks;