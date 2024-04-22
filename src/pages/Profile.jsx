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
  const [newName, setNewName] = useState();
  const [newPhoto, setNewPhoto] = useState();
  const [email, setEmail] = useState();
  
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setUser(user);
        setNewName(user.displayName);
        setNewPhoto(user.photoURL);
        setEmail(user.email);
        dispatch(
          setUser({
            name: user.displayName,
            email: user.email,
          })
        );
      }
    });
  }, [dispatch]);

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
    <>
      <div className="h-screen">
        <div className="px-10 pt-10">
          {/* <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold text-3xl">Profile</h1>
            </div>

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
          </div> */}
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
                <p className="mb-2"><strong>User Photo:</strong><img className="w-44 bg-white rounded shadow" src={newPhoto} alt="user photo" /> </p>
                <p className="mb-2"><strong>User Name:</strong> {newName}</p>
                <p className="mb-2"><strong>User Email:</strong> {email}</p>
                <div className="flex justify-between">
                  <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4 flex gap-2" title='Update'>
                    <span>Edit Account</span> 
                    <WrenchIcon className="h-6 w-6" />
                  </button>
                  <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mt-4 flex gap-2"  title='Delete'>
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
