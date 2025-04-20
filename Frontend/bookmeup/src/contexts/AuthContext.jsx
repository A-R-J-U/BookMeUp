import { React, createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { set } from "date-fns";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props) => {
  const [isloggedin, setisloggedin] = useState(false);
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios
      .get(`api/users/`, { withCredentials: true })
      .then((res) => {
        setuser(res.data);
        setisloggedin(true);
      })
      .catch((err) => {
        setuser(null);
        setisloggedin(false);
      })
      .finally(() => setloading(false));
  }, [isloggedin]);

  return (
    <AuthContext.Provider
      value={{ isloggedin, setisloggedin, user, setuser, loading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
