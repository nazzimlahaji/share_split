import { useEffect } from "react";
import { auth, googleProvider } from "../hooks/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { Button } from "antd";

function FirebaseLoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curUser) => {
      if (curUser?.emailVerified) {
        navigate("/dashboard", { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  async function signInGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      // handle error here
      console.error(e);
    }
  }

  return (
    <Button type="primary" shape="round" size="middle" onClick={signInGoogle}>
      Sign In with Google
    </Button>
  );
}

export default FirebaseLoginPage;
