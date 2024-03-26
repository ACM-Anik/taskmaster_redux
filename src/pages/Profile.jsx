import { useEffect, useState } from 'react';
import { deleteUser, sendEmailVerification, updateEmail, updateProfile } from 'firebase/auth';
import { useSelector } from 'react-redux';
import auth from '../utils/firebase.config';
import Swal from 'sweetalert2';


const Profile = () => {
  const [newName, setNewName] = useState();
  const [newEmail, setNewEmail] = useState();
  const user = useSelector((state) => state.usersSlice);

  useEffect(() => {
    setNewName(user?.name);
    setNewEmail(user?.email);

    console.log('newUserName=', user.name);
    console.log('newUserEmail=', user.email);
  }, []);

  // Edit the profile:-
  const [editing, setEditing] = useState(false);
  const handleEditClick = () => {
    setEditing(true);
  };
  const handleSaveClick = () => {
    setEditing(false);
  };
  const handleCancelClick = () => {
    setEditing(false);
  };

  // Changing the name:-
  const handleChange = (e) => {
    const inputName = e.target.name;
    const value = e.target.value;

    console.log('title=', inputName);
    console.log('value=', value);

    if (inputName === "name") {
      updateProfile(auth.currentUser, {
        displayName: value,
      });
      setNewName(value);
    }
    else if (inputName === "email") {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          // Email verification sent!
          // ...
        });

      updateEmail(auth.currentUser, `${value}`)
        .then(() => {
          setNewEmail(value);
        }).catch((error) => {
          console.log('UpdateEmailError=', error);
        });
    }
  };


  const handleDelete = () => {
    const user = auth.currentUser;

    // Toast to Delete:-
    // toast.custom((t) => (
    //   <div className={`${t.visible ? 'animate-enter' : 'animate-leave'
    //     } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //   >
    //     <div className="flex-1 w-0 p-4">
    //       <div className="flex items-start">
    //         <div className="flex-shrink-0 pt-0.5">
    //           <img
    //             className="h-10 w-10 rounded-full"
    //             src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
    //             alt=""
    //           />
    //         </div>
    //         <div className="ml-3 flex-1">
    //           <p className="text-sm font-medium text-gray-900">
    //             Emilia Gates
    //           </p>
    //           <p className="mt-1 text-sm text-gray-500">
    //             Are you sure? want to delete your account?
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex border-l border-gray-200">
    //       <button
    //         onClick={() => { toast.dismiss(t.id), setClick(true) }}
    //         className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //       >
    //         Delete
    //       </button>
    //     </div>
    //   </div>
    // ));

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }).catch((error) => {
          console.log('Delete Error', error);
        });
      }
    });

  };


  return (
    <div className="max-w-md mx-auto my-8 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      {editing ? (
        <div>
          <label className="block mb-2">Name:</label>
          <input type="text" name="name"
            value={user ? newName : "Set Your Name"}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 mb-4"
          />

          <label className="block mb-2">Email:</label>
          <input type="email" name="email"
            value={newEmail}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 mb-4"
          />

          <div className="flex justify-between">
            <button onClick={handleSaveClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-4">
              Save
            </button>
            <button onClick={handleCancelClick} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <div className="flex justify-between">
            <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4">
              Edit Account
            </button>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mt-4">
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
