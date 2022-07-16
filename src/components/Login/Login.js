import "./Login.css";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import { userContext } from "../../App";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons';


initializeApp(firebaseConfig);

const Login = () => {
  const [signedInUser, setSignedInUser] = useContext(userContext);

  const [newUser, setNewUser] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch("password");

  const initialState = {
    signUpSuccess: "",
    signUpError: "",
    signInSuccess: "",
    signInError: "",
  };
  const [signedInError, setSignedInError] = useState(initialState);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  //   handle email sign up
  const onSignUpDetailSubmit = (data) => {
    console.log(data, "sign up");
    if (data.name && data.email && data.password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          handleUpdateUserInfo(data.name);
          const user = userCredential.user;
          setUserInfo(user);
          const newSignUpError = { ...signedInError };
          newSignUpError.signUpSuccess = "Sign Up Successful";
          newSignUpError.signUpError = "";
          setSignedInError(newSignUpError);
        })
        .catch((error) => {
          console.log(error);
          const newSignUpError = { ...signedInError };
          newSignUpError.signUpError = "This email already in use";
          newSignUpError.signUpSuccess = "";
          setSignedInError(newSignUpError);
        });
    }
  };

  // update user info
  const handleUpdateUserInfo = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    })
      .then(() => {
        console.log("profile updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   handle email sign in
  const onSignInDetailSubmit = (data) => {
    console.log(data, "sign in");
    if (data.email && data.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUserInfo(user);
          const newSignInMessage = { ...signedInError };
          newSignInMessage.signInSuccess = "Login Successful";
          newSignInMessage.signInError = "";
          setSignedInError(newSignInMessage);
          history.replace(from);
        })
        .catch((error) => {
          console.log(error);
          const newSignInMessage = { ...signedInError };
          newSignInMessage.signInSuccess = "";
          newSignInMessage.signInError = "Invalid Email or Password";
          setSignedInError(newSignInMessage);
        });
    }
  };

  // handle google sign in
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUserInfo(user);
        history.replace(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle facebook sign
  const handleFacebookSign = () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUserInfo(user);
        history.replace(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // user info updating on state
  const setUserInfo = (user) => {
    const newSignedInUser = { ...signedInUser };
    newSignedInUser.name = user.displayName;
    newSignedInUser.email = user.email;
    setSignedInUser(newSignedInUser);
    handleSetNewLoggedInUser(newSignedInUser);
  };

  // storing state to local storage
  const handleSetNewLoggedInUser = (newLoggedInUser) => {
    localStorage.setItem("newLoggedInUser", JSON.stringify(newLoggedInUser))
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-box">
          <h4>
            <b>{newUser ? "Create an account" : "Login"}</b>
          </h4>
          {newUser && (
            <input
              style={errors.name && { borderBottom: "1px solid red" }}
              {...register("name", {
                required: "This field is required",
                pattern: {
                  value: /^[a-z]+$/g,
                  message: "Name should contains lowercase",
                },
                maxLength: {
                  value: 20,
                  message: "Name contains only 20 characters",
                },
              })}
              onKeyUp={() => trigger("name")}
              required
              type="text"
              placeholder="Name"
            />
          )}
          {errors.name && (
            <small className="err-message text-end">
              {errors.name?.message}
            </small>
          )}

          <input
            style={errors.email && { borderBottom: "1px solid red" }}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid Email Address",
              },
            })}
            onKeyUp={() => trigger("email")}
            required
            type="text"
            placeholder="Email"
          />
          {errors.email && (
            <small className="err-message">{errors.email?.message}</small>
          )}

          <input
            style={errors.password && { borderBottom: "1px solid red" }}
            {...register("password", {
              required: "This field is required",
              pattern: {
                value: /\d+/g,
                message: "Password must have at least one numeric value",
              },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            onKeyUp={() => trigger("password")}
            required
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <small className="err-message">{errors.password?.message}</small>
          )}

          <input
            style={errors.confirmPassword && { borderBottom: "1px solid red" }}
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) =>
                value === password.current || "This password don't match",
            })}
            onKeyUp={() => trigger("confirmPassword")}
            required
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <small className="err-message">
              {errors.confirmPassword?.message}
            </small>
          )}
          <br />
          {newUser && signedInError.signUpSuccess && (
            <small className="text-success">
              {signedInError.signUpSuccess}
            </small>
          )}
          {newUser && signedInError.signUpError && (
            <small className="err-message">{signedInError.signUpError}</small>
          )}
          {newUser === false && signedInError.signInSuccess && (
            <small className="text-success">
              {signedInError.signInSuccess}
            </small>
          )}
          {newUser === false && signedInError.signInError && (
            <small className="err-message">{signedInError.signInError}</small>
          )}

          {newUser ? (
            <button
              onClick={handleSubmit(onSignUpDetailSubmit)}
              type="submit"
              className="form-input-btn"
            >
              Create an account
            </button>
          ) : (
            <button
              onClick={handleSubmit(onSignInDetailSubmit)}
              type="submit"
              className="form-input-btn"
            >
              Login
            </button>
          )}
          <p>
            {newUser ? "Already" : "Don't"} have an account?
            <button onClick={() => setNewUser(!newUser)} className="toggle-btn">
              {newUser ? "Login" : "Create account"}
            </button>
          </p>
          <p className="or-edit">
            <span className="or-text">Or</span>
          </p>
          <button onClick={handleGoogleSignIn} className="form-input-btn">
            <FontAwesomeIcon icon={['fab', 'google']} />
            Continue with Google
          </button>
          <button onClick={handleFacebookSign} className="form-input-btn">
            <span><FontAwesomeIcon icon={['fab', 'facebook']} />
            Continue with Facebook</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
