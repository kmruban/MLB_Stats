import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://apimlbstats.com/api/Users/register",
        {
          firstname,
          lastname,
          username,
          email,
          password,
        }
      );
      console.log(username)
      console.log(password)

      toast.success("Registration Successful");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="register_page">
      <h2>REGISTER</h2>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div>
            <label>
              <b>First Name: </b>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              <b>Last Name: </b>
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              <b>Email: </b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              <b>Password: </b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="submit">
            <button type="submit">Register</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
