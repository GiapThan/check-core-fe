import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigation = useNavigate();
  useEffect(() => {
    navigation("/login");
  }, []);
  return <p></p>;
};
export default Redirect;
