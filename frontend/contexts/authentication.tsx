import { IUser } from "@/interfaces/IUser";
import {
    createContext,
    useContext,
    useEffect,
    type PropsWithChildren
} from "react";
import { useStorageState } from "../hooks/auth/useStorageState";
import { useRouter } from "expo-router";

const AuthContext = createContext<{
    signIn: (user: IUser) => void;
    signOut: () => void;
    session?: IUser | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    // updateSession: () => null,
    session: null,
    isLoading: false,
});

export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error("useSession must be wrapped in a <SessionProvider />");
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const router = useRouter();
    const [[isLoading, session], setSession] = useStorageState("session");

    useEffect(() => {
        if(session) {
            console.log({ session })
            return router.navigate("/(tabs)")
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signIn: (user: IUser) => {
                    setSession(user);
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}