import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(userRef);
        let userData = {};
        if (!snap.exists()) {
          // Create a basic profile if not exists
          userData = { email: firebaseUser.email, name: firebaseUser.displayName || "", admin: false, createdAt: new Date() };
          await setDoc(userRef, userData);
        } else {
          userData = snap.data();
        }
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...userData,
          isAdmin: userData.admin === true,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  };

  const signup = async (email, password, name) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), {
      name,
      email,
      admin: false,
      createdAt: new Date(),
    });
    return cred.user;
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);