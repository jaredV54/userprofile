import axios from 'axios';
import { useState, useEffect } from 'react';
import Config from '../utils/config.json';
axios.defaults.withCredentials = true;


const useAuth = (navigate) => {
  const [user, setUser] = useState({ userId: '', firstName: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${Config.Configuration.database}/verify-token`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });

        if (response.status === 200) {
          setUser(response.data);
          setIsAuthenticated(true);
        } else {
          navigate("/");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            const refreshResponse = await axios.post(`${Config.Configuration.database}/refresh-token`, {}, {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            });

            if (refreshResponse.status === 200) {
              fetchUserData();
            } else {
              navigate("/");
            }
          } catch (refreshError) {
            console.error('Refresh token failed:', refreshError);
            navigate("/");
          }
        } else {
          console.error('Error fetching user data:', error);
          navigate("/");
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  return { user, isAuthenticated };
};

export default useAuth;