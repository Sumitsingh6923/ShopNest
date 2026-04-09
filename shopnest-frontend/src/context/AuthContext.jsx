import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, loginUser, logoutUser } from "../store/authSlice";

export const AuthProvider = ({ children }) => children;

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, loading, isAuthenticated, error } = useSelector(
    (state) => state.auth,
  );

  return {
    user,
    token,
    loading,
    isAuthenticated,
    error,
    login: async (email, password) => {
      const resultAction = await dispatch(loginUser({ email, password }));
      return loginUser.fulfilled.match(resultAction)
        ? resultAction.payload
        : null;
    },
    logout: () => dispatch(logoutUser()),
    clearError: () => dispatch(clearAuthError()),
  };
};
