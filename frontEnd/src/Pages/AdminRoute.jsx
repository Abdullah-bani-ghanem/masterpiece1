import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/check-auth", {
          withCredentials: true,
        });
        const user = res.data.user;
        if (user && user.role === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
