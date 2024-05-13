import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/image/login.svg';
import { loginUser, signInWithGoogle } from '../redux/features/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
// import { useAddUserMutation } from '../redux/features/users/usersApi';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../utils/firebase.config';


const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, isError, error, email } = useSelector((state) => state.usersSlice);
  const dispatch = useDispatch();
  // const [addUser, { data: addUserSuccess, error: addUserError }] = useAddUserMutation();
  // if(addUserSuccess){
  //   console.log('addUserSuccess', addUserSuccess);
  // }
  // if(addUserError){
  //   console.log('addUserError', addUserError);
  // }

  // SignIn:-
  const onSubmit = ({ email, password }) => {
    dispatch(loginUser({
      email,
      password,
    }));
  };
  
  const setNewUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // addUser({
        //   name: user.displayName,
        //   email: user.email,
        //   photoURL: user?.photoURL,
        //   role: "member",
        //   chat: []
        // });
      }
    });
  };
  
  // Google SignIn:-
  const handleGoogleLogin = () => {
    dispatch(signInWithGoogle());
    
    setTimeout(() => {
      setNewUser();
    }, 1000);
  };
  
  // Error handling:-
  useEffect(() => {
    if (isError && error) {
      toast.error(error);
    }
  }, [isError, error]);

  // Navigating by checking Loading:-
  useEffect(() => {
    if (!isLoading && email) {
      navigate('/');
    }
  }, [isLoading, email, navigate]);

  // Toggle password visibility:-
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="flex max-w-7xl h-screen items-center mx-auto">
      <div className="w-1/2">
        <img src={loginImage} className="h-full w-full" alt="" />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="bg-primary/5 w-full max-w-sm rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Login</h1>
          <form className="space-y-3 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md"
                {...register('email')}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="password">Password</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full rounded-md"
                  {...register('password')}
                />
                {/* Password showing button */}
                <button
                  type="button" //to prevent form submission
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-600 hover:text-blue-800"
                  onClick={() => togglePasswordVisibility()}
                >
                  {showPassword ? (
                    "Hide"
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="relative !mt-8">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
            <div>
              <p>
                Don&apos;t have an account?{' '}
                <span
                  className="text-primary hover:underline cursor-pointer"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </span>
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
