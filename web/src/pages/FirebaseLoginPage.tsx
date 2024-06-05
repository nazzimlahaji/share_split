import { Button, Flex, Spin } from "antd";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyGetIdentityQuery } from "../api/apiSlice";
import { auth, googleProvider } from "../hooks/firebase";

function FirebaseLoginPage() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [trigger, result] = useLazyGetIdentityQuery();
  const { data, error, isLoading, isSuccess, isError } = result;

  // useEffect => to listen on firebase auth changed and
  // trigger fetching of /whoami endpoint only if user email is verified
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curUser) => {
      // console.log("onAuthStateChanged");
      if (curUser) {
        if (curUser?.emailVerified) {
          // console.log("verify whoami");
          trigger();
        } else {
          console.error("User email is not verified");
        }
      }
    });

    return () => unsubscribe();
  }, [trigger]);

  // useEffect => that will only be trigger when the current page is being loaded.
  useEffect(() => {
    if (user && data && isSuccess && user.email === data.data.Email) {
      // console.log("navigate to dashboard");
      navigate("/dashboard", { replace: true });
    } else if (isError && error) {
      console.error("Authorization Error:", error);
    }
  }, [data, error, isError, isSuccess, navigate, user]);

  if (isLoading) {
    return (
      <Flex
        justify="center"
        align="center"
        style={{
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <Spin size="large" />
      </Flex>
    );
  }

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
