import { React, createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props) => {
  const api = import.meta.env.VITE_API_URL;
  const [isloggedin, setisloggedin] = useState(false);
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios
      .get(`${api}/users/`, { withCredentials: true })
      .then((res) => {
        setuser(res.data);
        setisloggedin(true);
        setloading(false);
      })
      .catch((err) => {
        setuser(null);
        setloading(false);
        setisloggedin(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isloggedin, setisloggedin, user, setuser, loading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
