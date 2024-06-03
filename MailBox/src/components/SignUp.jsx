import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoaderActions } from '../Store/UI-Slice/loader-slice';
import { useNavigate } from 'react-router-dom';
import { AuthActions } from '../Store/Auth-Slice/auth-slice';

const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPassRef = useRef(null);
  const [isLogin, setIsLogin] = useState(false);
  const isLoader = useSelector(state => state.loader.isVisible);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const switchHandler = () => {
    setIsLogin(prevState => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();

    if (!email || !password) {
      console.error('Email or password is empty');
      return;
    }

    if (isLogin) {
      const confirmPassword = confirmPassRef.current?.value.trim();
      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }
    }

    dispatch(LoaderActions.isLoadingData());


    let url =''

        if(!isLogin){

            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_4OizxYWp9ebAEhe-XdfbpDXTIRhxbIo';

        }else{

            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_4OizxYWp9ebAEhe-XdfbpDXTIRhxbIo'

        }

    
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Authentication successful', data);
        dispatch(LoaderActions.stopIsloading());
        dispatch(AuthActions.loginHandler(data.idToken));
        localStorage.setItem('email',data.email)
        navigate('/mainnavigation');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Authentication Failed');
      }
    } catch (error) {
      console.error('Authentication failed', error.message);
      alert('Authentication failed');
      dispatch(LoaderActions.stopIsloading());
    }
  };

  return (
    <>
      <h1 className='text-7xl text-center'>MailBox Client</h1>
      <section className='flex items-center justify-center mt-5'>
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className='text-center text-2xl mb-4'>{isLogin ? 'SignUp' : 'SignIn'}</h2>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  ref={emailRef}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                />
              </div>

              {isLogin && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                    Confirm Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm Password"
                    ref={confirmPassRef}
                  />
                </div>
              )}

              <div className="flex items-center justify-center">
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit"
                >
                  {isLoader ? <span>Loading...</span> : (isLogin ? 'Signup' : 'Signin')}
                </button>
              </div>

              {!isLogin && (
                <div className="mt-4 text-center">
                  <a href="#" className="text-blue-500 hover:text-blue-700">Forgot password?</a>
                </div>
              )}
            </form>
          </div>
          <div className="text-center mt-4">
            <button onClick={switchHandler} className="text-blue-500 hover:text-blue-700">
              {isLogin ? `Have an account? Login` : `Don't have an account? Register`}
              </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;

