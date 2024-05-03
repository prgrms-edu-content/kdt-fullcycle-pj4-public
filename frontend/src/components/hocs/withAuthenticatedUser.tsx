import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { User } from "@/types/user";

interface WithAuthenticatedProps {
  currentUser: User;
}

export function withAuthenticatedUser(
  Component: React.ComponentType<WithAuthenticatedProps>
): React.FC {
  return () => {
    const { currentUser } = useCurrentUser();
    const navigate = useNavigate();

    if (!currentUser) {
      return null;
    }
    if (currentUser === "unauthenticated") {
      navigate("/login");
      return null;
    }
    return <Component currentUser={currentUser} />;
  };
}
