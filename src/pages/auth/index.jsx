import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate , Navigate } from "react-router-dom";
import './style.css'
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

export const Auth = () => {
    const navigate = useNavigate();
    const {isAuth} = useGetUserInfo();
  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth , provider);
    const authInfo = {
        userID:results.user.uid,
        name:results.user.displayName ,
        profilePhoto:results.user.photoURL ,
        isAuth:true,
    };
      
    localStorage.setItem("auth" , JSON.stringify(authInfo) );    
    navigate("/expence-tracker")
  };
  if(isAuth) {
return<Navigate to="/expense-tracker"/>  }

  return (  
    <div className="login-page">
      <p>Sign in With Google to Continue</p>
      <button  onClick={signInWithGoogle} className="login-with-google-btn"><span className="image"></span>
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};
