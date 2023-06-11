"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import nookies, { setCookie } from "nookies";
import firebaseClient from "firebase/compat/app";
import { useQuery, useMutation } from "@tanstack/react-query";
import { auth, provider } from "@/utils/config/firebase";
import { getUser, chatLogin } from "@/utils/api";
import useNotificationDisplay from "../utils/notification";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [password, setPassword] = useState("");
  const [currentUserDetails, setCurrentUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState(false);
  const [displayNotification, notification] = useNotificationDisplay(null, 5);
  const router = useRouter();

  const loginUserChatMutation = useMutation({
    mutationFn: chatLogin,
  });

  // Query to fetch user details
  const { refetch } = useQuery({
    queryKey: ["userDetails", currentUser],
    queryFn: getUser,
    enabled: currentUser !== null,
    onSuccess: (data) => {
      if (!data["error"]) {
        setCurrentUserDetails(data);
        setCookie(null, "userDetails", JSON.stringify(data), {
          maxAge: 30 * 24 * 60 * 60, // 30 days expiration
        });
        if (password) {
          loginUserChatMutation.mutate({
            password: password === "---" ? currentUser.uid : password,
            username: data.username,
          });
          router.push("/discussions?page=1&filter=All");
          setPassword("");
        }
      } else {
        if (currentUser.emailVerified) router.push("/account/setup");
        else router.push("/auth/email_verification");
      }
      setLoading(false);
    },
  });

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const signinWithGoogle = async () => {
    setPassword("---");
    return auth.signInWithPopup(provider).catch(alert);
  };

  const signin = async (email, password) => {
    setPassword(password);
    return auth.signInWithEmailAndPassword(email, password);
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email, {
      url: "https://devonnex.tech/auth/login",
    });
  };

  const logout = () => {
    return auth.signOut();
  };

  const setNotification = (type, notification) => {
    displayNotification(
      <p style={{ color: type ? "green" : "red" }}>{notification}</p>
    );
  };

  useEffect(() => {
    const unsubscribeIdToken = auth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setCurrentUser(user);
        nookies.set(undefined, "_usertoken_", token, { path: "/" });
        // if (currentUserDetails) setLoading(false);
      }
    });

    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setCurrentUser(null);
        setCurrentUserDetails(null);
        setLoading(false);
        nookies.set(undefined, "_usertoken_", "", { path: "/" });
      } else {
        setCurrentUser(user);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeIdToken();
    };
  }, []);

  // Force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseClient.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // Clean up setInterval
    return () => clearInterval(handle);
  }, []);

  const value = {
    currentUser,
    currentUserDetails,
    signup,
    signin,
    logout,
    resetPassword,
    signinWithGoogle,
    setNotification,
    setCurrentUserDetails,
    requestLoading,
    setCurrentUser,
  };

  const loader = (
    <div className="preload" data-preaload>
      <div className="circle"></div>
      <p className="text">Devonnex</p>
    </div>
  );

  return (
    <AuthContext.Provider value={value}>
      {loading ? loader : children}
      {notification && <div className="notification">{notification}</div>}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
