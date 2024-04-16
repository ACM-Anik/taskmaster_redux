import { BellIcon, MagnifyingGlassIcon, TrashIcon, WrenchIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import MenuDropdown from '../components/ui/MenuDropdown';
import auth from '../utils/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { useGetUsersQuery } from '../redux/features/users/usersApi';
import UpdateUserModal from '../components/users/UpdateUserModal';

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [modalUser, setModalUser] = useState();

  const { data: allUsers } = useGetUsersQuery();


  // Setting the user Profile:-
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);



  // Open Update modal:-
  const handleModal = (id, user) => {
    setUserId(id);
    setIsOpen(!isOpen);
    setModalUser(user);
  };


  return (
    <>
      <div className="h-screen overflow-hidden grid grid-cols-12">
        <UpdateUserModal isOpen={isOpen} setIsOpen={setIsOpen} id={userId} modalUser={modalUser}></UpdateUserModal>
        <div className="col-span-9 px-10 pt-10">
          {/* NavBars-------------------- */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold text-3xl">Setting</h1>
            </div>
            {/* NavLinks  */}
            <div className="flex gap-5">
              <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-10 w-10  grid place-content-center text-secondary hover:text-white transition-all">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
              <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-10 w-10 grid place-content-center text-secondary hover:text-white transition-all">
                <BellIcon className="h-6 w-6" />
              </button>

              <MenuDropdown>
                <div className="h-10 w-10 rounded-xl overflow-hidden">
                  <img
                    title={user?.displayName}
                    src={user?.photoURL ?
                      user.photoURL
                      :
                      "https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=644&q=80"
                    }
                    alt="profile"
                    className="object-cover h-full w-full "
                  />
                </div>
              </MenuDropdown>

            </div>
          </div>
          {/* Settings main interface (Second colspan)-------------*/}
          <div className="grid grid-cols-1 gap-5 mt-10">
            <div className="relative h-screen overflow-y-auto">
              <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
                <h1>Total Members (Users)</h1>
                <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                  {allUsers?.length}
                </p>
              </div>
              <div className="space-y-3 overflow-x-hidden overflow-y-auto mb-36">
                {allUsers?.map((user) =>
                  <div
                    key={user._id}
                    className="bg-sky-200 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:shadow-lg hover:transition-all"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 m-2 rounded-xl overflow-hidden">
                        <img
                          src={user.photoURL}
                          alt="user"
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div>
                        <h1 className="text-lg font-semibold">{user.name}</h1>
                        <h1 className="text-lg">{user.email}</h1>
                      </div>
                    </div>
                    <div className="flex justify-center gap-3">
                      <button
                        className="btn btn-primary flex flex-row gap-2"
                        title='Update'
                        onClick={() => handleModal(user._id, user)}
                      >
                        <WrenchIcon className="h-6 w-6" />
                      </button>
                      <button
                        className="btn btn-danger flex gap-2"
                        title='Delete'>
                        <TrashIcon className="h-6 w-6 " />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Shortcut Tools (Third col span )----------------*/}
        <div className="col-span-3 border-l-2 border-secondary/20 px-10 pt-10 overflow-hidden">
          <div>
            <h1 className="text-xl">Shortcut Tools</h1>
            <div className="flex flex-wrap items-center gap-3 mt-3 overflow-y-auto overflow-x-hidden">
              {allUsers?.map((user) =>
                <div
                  key={user._id}
                  className="h-10 w-10 m-2 rounded-xl overflow-hidden hover:scale-105 hover:transition-all"
                  title={user?.name}
                >
                  <img
                    src={user.photoURL}
                    alt="user"
                    className="object-cover h-full w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;

