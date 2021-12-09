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
} from "firebase/auth";

initializeApp(firebaseConfig);

const Login = () => {
  const [signedInUser, setSignedInUser] = useContext(userContext);
  console.log(signedInUser, "signedInuser");

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
          // const newSignedInUser = {...signedInUser};
          // newSignedInUser.name = user.displayName;
          // newSignedInUser.email = user.email;
          // setSignedInUser(newSignedInUser);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
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
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
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
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  // handle google sign in
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUserInfo(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const setUserInfo = (user) => {
    const newSignedInUser = { ...signedInUser };
    newSignedInUser.name = user.displayName;
    newSignedInUser.email = user.email;
    setSignedInUser(newSignedInUser);
  };

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
            type="text"
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
                value === password.current || "this password don't match",
            })}
            onKeyUp={() => trigger("confirmPassword")}
            required
            type="text"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <small className="err-message">
              {errors.confirmPassword?.message}
            </small>
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
            Continue with Google
          </button>
          <button className="form-input-btn">Continue with Facebook</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
