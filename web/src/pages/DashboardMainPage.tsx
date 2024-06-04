import { useEffect } from "react";
import { auth } from "../hooks/firebase";

function DashboardMainPage() {
  useEffect(() => {
    const token = auth.currentUser?.getIdToken();

    token?.then((token) => console.log(token));
  }, []);

  return <div>DashboardMainPage</div>;
}

export default DashboardMainPage;
