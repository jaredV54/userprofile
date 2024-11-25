import { useState } from 'react'
import './App.css';
import RegisterRoute from './routes/RegisterRoute';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import LogInRoute from './routes/LogInRoute';
import UserProfileRoute from './routes/UserProfileRoute';

const AuthenticatedRoutes = ({ values }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth(navigate);

  const isUserFilled = () => {
    return user.userId !== ''
  };

  if (!isAuthenticated || !isUserFilled()) {
    return <div className="access_denied">Please Log in or register first.</div>;
  }

  return (
    <Routes>
      <Route path='/userprofile' element={<UserProfileRoute userId={user.userId} />} />
    </Routes>
  );
};

const App = () => {
  const [values, setValues] = useState({ email: '', password: '' });

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogInRoute values={values} setValues={setValues} />} />
        <Route path='/*' element={<AuthenticatedRoutes values={values} />} />
        <Route path='/register' element={<RegisterRoute />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
