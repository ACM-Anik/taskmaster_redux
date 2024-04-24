import { useEffect, useState } from 'react';
import { EmailAuthProvider, deleteUser, onAuthStateChanged, reauthenticateWithCredential, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import auth from '../utils/firebase.config';
import Swal from 'sweetalert2';
import { TrashIcon, WrenchIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/layouts/Navbar';
import { setUser } from '../redux/features/users/usersSlice';



const Profile = () => {
  const dispatch = useDispatch();
  // const [, setUser] = useState();
  // const [newChangedName, setNewChangedName] = useState("");
  // const [newChangedPhoto, setNewChangedPhoto] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhoto, setNewPhoto] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setUser(user);
        setNewName(user.displayName);
        setNewPhoto(user.photoURL);
        setEmail(user.email);
      }
    });
  }, [dispatch]);

  // Delete user account:--
  const handleDelete = () => {
    const user = auth.currentUser;
    if (!user) {
      console.error('User is not authenticated.');
      return;
    }
    const promptForCredentials = () => {
      const password = prompt("Provide your password: ");
      if (password) {
        return password;
      } else {
        return null;
      }
    };
    const reauthenticate = () => {
      const password = promptForCredentials();
      if (password) {
        const credential = EmailAuthProvider.credential(user?.email, password);
        reauthenticateWithCredential(user, credential)
          .then(() => {
            deleteUser(user).then(() => {
              dispatch(
                setUser({
                  name: "",
                  email: "",
                })
              );
              Swal.fire({
                title: "Account Deleted!",
                text: "Your account has been deleted.",
                icon: "success"
              });
            }).catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Something went wrong! ${error}`,
                footer: '<a href="#">Why do I have this issue?</a>'
              });
            });
          }).catch((error) => {
            console.error('Re-authentication error:', error);
          });
      }
    };
    Swal.fire({
      title: "Are you want to delete your account?",
      text: "You won't be able to continue browsing!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        reauthenticate();
      }
    });
  };


  // Changing the name, email, PhotoURL:-
  const handleChange = (e) => {
    const inputTitle = e.target.name;
    const inputValue = e.target.value;
    // console.log('inputTitle=', inputTitle);
    // console.log('inputValue=', inputValue);

    if (inputTitle === "name") {
      setNewName(inputValue);
      // setNewChangedName(inputValue);
      updateProfile(auth.currentUser, {
        displayName: inputValue,
      });
    }
    if (inputTitle === "photo") {
      setNewPhoto(inputValue);
      // setNewChangedPhoto(inputValue);
      updateProfile(auth.currentUser, {
        photoURL: inputValue,
      });
    }
  };

  // Edit the profile:-
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  
  const handleSetClick = () => {
    console.log('newName-126', newName)
    // updateProfile(auth.currentUser, {
    //   displayName: newName,
    // });

    // handleSetSave();
    // dispatch(
    //   setUser({
    //     name: newName,
    //   })
    // );
  };
  
  const handleSaveClick = () => {
    setEditing(false);

    // setNewName(newChangedName);
    // updateProfile(auth.currentUser, {
    //   displayName: newName,
    // });

    // handleSetSave();
    // dispatch(
    //   setUser({
    //     name: newName,
    //   })
    // );
    handleSetClick();
  };
  const handleCancelClick = () => {
    setEditing(false);
  };


  return (
    <>
      <div className="h-screen">
        <div className="px-10 pt-10">
          {/* Navbar-------------- */}
          <Navbar title="Profile"></Navbar>

          <div className="max-w-lg m-auto my-8 p-8 bg-[#D3DDF9] rounded-lg shadow-md">
            <div className="w-full h-full bg-cover bg-center opacity-10 absolute top-0 left-0 -z-10" style={{ backgroundImage: `url(${newPhoto})` }}></div>
            {editing ? (
              <div>
                <label className="block mb-2">Photo:</label>
                <input type="text" name="photo"
                  value={`${newPhoto}`}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 mb-4"
                />
                <label className="block mb-2">Name:</label>
                <input type="text" name="name"
                  defaultValue={newName}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 mb-4"
                />
                <label className="block mb-2">Email:</label>
                <input type="email" name="email"
                  value={email}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 mb-4"
                />

                <div className="flex justify-between">
                  <button onClick={() => handleSaveClick()} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-4">
                    Save
                  </button>
                  <button onClick={() => handleCancelClick()} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="mb-2"><strong>User Photo:</strong><img className="w-44 bg-white rounded shadow" src={newPhoto} alt="user photo" /> </p>
                <p className="mb-2"><strong>User Name:</strong> {newName}</p>
                <p className="mb-2"><strong>User Email:</strong> {email}</p>
                <div className="flex justify-between">
                  <button onClick={() => handleEditClick()} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4 flex gap-2" title='Update'>
                    <span>Edit Account</span>
                    <WrenchIcon className="h-6 w-6" />
                  </button>
                  <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mt-4 flex gap-2" title='Delete'>
                    <span>Delete Account</span>
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;
