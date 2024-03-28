import { useEffect, useState } from 'react';
import { EmailAuthProvider, deleteUser, onAuthStateChanged, reauthenticateWithCredential, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import auth from '../utils/firebase.config';
import { setUser } from '../redux/features/users/usersSlice';
import Swal from 'sweetalert2';


const Profile = () => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState();
  const [newPhoto, setNewPhoto] = useState();
  const [email, setEmail] = useState();

  useEffect(()=> {
    onAuthStateChanged(auth, (user) =>{
      setNewName(user.displayName);
      setNewPhoto(user.photoURL);
      setEmail(user.email);
    });
  },[]);

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

  // Changing the name, email, PhotoURL:-
  const handleChange = (e) => {
    const inputName = e.target.name;
    const value = e.target.value;
    // console.log('title=', inputName);
    // console.log('value=', value);

    if (inputName === "name") {
      updateProfile(auth.currentUser, {
        displayName: value,
      });
      setNewName(value);
    }
    if (inputName === "photo") {
      updateProfile(auth.currentUser, {
        photoURL: value,
      });
      setNewPhoto(value);
    }
  };
  console.log(newPhoto);

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


  return (
    <div className="max-w-md mx-auto my-8 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
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
            value={newName}
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
          <img className="w-32 my-2" src={newPhoto} alt="user" />
          <p><strong>Name:</strong> {newName}</p>
          <p><strong>Email:</strong> {email}</p>
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
