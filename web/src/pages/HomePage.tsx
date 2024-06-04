import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Button
        type="primary"
        shape="round"
        size="middle"
        onClick={() => navigate("/login", { replace: true })}
      >
        Login here
      </Button>
    </>
  );
}

export default HomePage;
