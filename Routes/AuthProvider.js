import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [confirmCode, setConfirmCode] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        phoneAuth: async (phoneNumber) => {
          try {
            const confirmation = await auth().signInWithPhoneNumber(
              phoneNumber
            );
            setConfirmCode(confirmation);
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
