import React, { createContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [confirmCode, setConfirmCode] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    try {
      auth().onAuthStateChanged((user) => {
        if (user) {
          firestore()
            .collection("userData")
            .doc(user.phoneNumber)
            .get()
            .then((doc) => {
              if (doc.exists) {
                setUserId(doc.data().user_id);
              }
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
    return () => {
      setUserId("");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userId,
        phoneAuth: async (phoneNumber, userId) => {
          try {
            const confirmation = await auth().signInWithPhoneNumber(
              phoneNumber
            );
            setConfirmCode(confirmation);
            try {
              firestore()
                .collection("userData")
                .doc(`${phoneNumber}`)
                .set({
                  user_id: parseInt(userId),
                });
            } catch (error) {
              console.log(error);
            }
          } catch (e) {
            console.log(e);
          }
        },
        verifyPhone: async (code) => {
          try {
            await confirmCode.confirm(code);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
