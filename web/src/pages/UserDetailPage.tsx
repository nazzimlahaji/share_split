import { useParams } from "react-router-dom";

function UserDetailPage() {
  const { id } = useParams();

  return <div>UserDetailPage: {id}</div>;
}

export default UserDetailPage;
