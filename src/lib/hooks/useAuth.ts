const useAuth = () => {
  const token = localStorage.getItem("TesHub_access");

  if (!token) return false;
  return true;
};

export default useAuth;
