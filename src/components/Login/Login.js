import "./Login.css";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data, "data");

  const password = useRef({});
  password.current = watch("password");

  const handleSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <button type="submit" className="form-input-btn">
              {" "}
              Create an account
            </button>
          ) : (
            <button type="submit" className="form-input-btn">
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
          <button className="form-input-btn">Continue with Google</button>
          <button className="form-input-btn">Continue with Facebook</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

// <form onSubmit={handleSubmit(onSubmit)} className="form-box">

// <input {...register("exampleRequired", { required: true })} />
// {errors.exampleRequired && <span>This field is required</span>}

// <input
// {...register("name", {
//    required:"This field is required",
//    pattern: {
//        value: /^[a-z]+$/g,
//        message: "Name should contains lowercase"
//    },
//    maxLength:{
//        value:20,
//        message:"Name contains only 20 characters"
//    }
//   })}
//   onKeyUp={() => trigger("name")}
// required type="text" placeholder="Name" />
// {errors.name && <small>{errors.name?.message}</small>}

// <input
// {...register("email", {
//   required:"This field is required",
//   pattern: {
//       value: /\S+@\S+\.\S+/,
//       message: "Invalid Email Address"
//   }
//  })}
//  onKeyUp={() => trigger("email")}
// required type="text" placeholder="Email" />
// {errors.email && <small>{errors.email?.message}</small>}

// <input
// {...register("password", {
//   required:"This field is required",
//   pattern: {
//       value: /\d+/g,
//       message: "Password must have at least one numeric value"
//   },
//   minLength:{
//       value:6,
//       message:"Password must be at least 6 characters"
//   }
//  })}
//  onKeyUp={() => trigger("password")}
// required type="password" placeholder="Password" />
// {errors.password && <small>{errors.password?.message}</small>}

// <input
// {...register("confirmPassword", {
//   required:"This field is required",

//  })}
//  onKeyUp={() => trigger("confirmPassword")}
// required type="password" placeholder="Confirm Password" />
// {errors.confirmPassword && <small>{errors.confirmPassword?.message}</small>}

// <input type="submit"  className="form-input-btn"  />
// <button type="submit">Create new account</button>
// </form>
// );
