import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./authContexts";

function AuthRoute(Component) {
  const Auth = (props) => {
    const { currentUserDetails } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // Redirect to login page if currentUserDetails is falsy (not authenticated)
      if (!currentUserDetails) {
        router.push("/auth/login");
      }
    }, [currentUserDetails, router]);

    return currentUserDetails && <Component {...props} />;
  };

  return Auth;
}

export default AuthRoute;
