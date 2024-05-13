import { TrashIcon, WrenchIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
// import MenuDropdown from '../components/ui/MenuDropdown';
import auth from '../utils/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { useGetUsersQuery, useRemoveUserMutation } from '../redux/features/users/usersApi';
import UpdateUserModal from '../components/users/UpdateUserModal';
import Swal from 'sweetalert2';
import Navbar from '../components/layouts/Navbar';


const admin = "aaaaaaaanikmojumder@gmail.com";
const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [modalUser, setModalUser] = useState();
  const { data: allUsers } = useGetUsersQuery();
  const [deleteUser, { data: deleteData, error: deleteError }] = useRemoveUserMutation();
  if (deleteData) {
    console.log('deleteData', deleteData);
  }
  if (deleteError) {
    console.log('deleteError', deleteError);
  }


  // Setting the user Profile:-
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  // Open Update modal:--
  const handleModal = (id, user) => {
    if (admin === user.email) {
      setUserId(id);
      setIsOpen(!isOpen);
      setModalUser(user);
    } else {
      Swal.fire({
        title: "Sorry!",
        text: "Only Admin can update any member.",
        icon: "error"
      });
    }
  };

  // Delete user:-- 
  const handleDelete = (member) => {
    // Checking the Admin:-
    if (admin === user?.email) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete the Member!"
      }).then((result) => {
        if (result.isConfirmed) {
          deleteUser(member._id);
          if (deleteData) {
            Swal.fire({
              title: "Deleted!",
              text: "Member(user) has been deleted.",
              icon: "success"
            });
          } else {
            Swal.fire({
              title: "Ops!",
              text: "Member(user) has not been deleted due to server error.",
              icon: "fail"
            });
          }
        }
      });
    } else {
      Swal.fire({
        title: "Sorry!",
        text: "Only Admin can remove(delete) any member.",
        icon: "error"
      });
    }
  };

  return (
    <>
      <div className="h-screen overflow-hidden grid grid-cols-12">
        <UpdateUserModal isOpen={isOpen} setIsOpen={setIsOpen} id={userId} modalUser={modalUser}></UpdateUserModal>
        <div className="col-span-9 px-10 pt-10">
          {/* NavBars-------------------- */}
          <Navbar title="Settings"></Navbar>
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
                {allUsers?.map((member) =>
                  <div
                    key={member._id}
                    className="bg-sky-200 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:shadow-lg hover:transition-all"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 m-2 rounded-xl overflow-hidden">
                        <img
                          src={member.photoURL}
                          alt="member"
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h1 className="text-lg font-semibold">{member?.name}</h1>
                          <h1 className="text-xs uppercase bg-sky-100 p-1 rounded">{member.role ? member.role : "member"}</h1>
                        </div>
                        <h1 className="text-lg">{member?.email}</h1>
                      </div>
                    </div>
                    <div className="flex justify-center gap-3">
                      <button
                        className="btn btn-primary flex flex-row gap-2"
                        title='Update'
                        onClick={() => handleModal(member._id, member)}
                      >
                        <WrenchIcon className="h-6 w-6" />
                      </button>
                      <button
                        className="btn btn-danger flex gap-2"
                        title='Delete'
                        onClick={() => handleDelete(member)}
                      >
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
              {allUsers?.map((member) =>
                <div
                  key={member._id}
                  className="h-10 w-10 m-2 rounded-xl overflow-hidden hover:scale-105 hover:transition-all"
                  title={member?.name}
                >
                  <img
                    src={member.photoURL}
                    alt="member"
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

