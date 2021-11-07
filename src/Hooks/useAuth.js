import { useContext } from "react";
import { Authcontext } from "../Contexts/AuthProvider/AuthProvider";

const useAuth = () => {
    const auth = useContext(Authcontext);
    return auth;
}

export default useAuth;