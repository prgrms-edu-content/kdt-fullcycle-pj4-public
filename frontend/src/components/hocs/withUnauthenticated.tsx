import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export function withUnauthenticated(Component: React.ComponentType): React.FC {
  return () => {
    const { currentUser } = useCurrentUser();
    const navigate = useNavigate();

    if (!currentUser) {
      return null;
    }
    if (currentUser !== "unauthenticated") {
      navigate("/notes");
      return null;
    }
    return <Component />;
  };
}
