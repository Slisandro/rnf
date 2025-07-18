import { app, database } from "@/firebase";
import { IUser } from "@/interfaces/IUser";
import getCustomErrorMessage from "@/utils/firebaseErrors";
import {
    createUserWithEmailAndPassword,
    getAuth,
    initializeAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    updateEmail,
    updatePassword
} from "firebase/auth";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc
} from "firebase/firestore";
import { Toast } from "toastify-react-native";

interface UserRegister {
    name: string;
    lastName: string;
    email: string;
    password: string;
    countryCode: string;
    phone: string;
}

const auth = initializeAuth(app);

export async function registerUserService(user: UserRegister) {
    const { email, password, name, lastName, phone, countryCode } = user;

    try {
        // Registrar usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const uid = userCredential.user.uid;

        // Guardar usuario en Firestore
        await setDoc(doc(database, "users", uid), {
            name: name,
            lastName: lastName,
            email,
            countryCode,
            phone
        });

        Toast.success("Usuario registrado con éxito");
        return userCredential.user;
    } catch (error) {
        Toast.error(getCustomErrorMessage((error as any).code));
        return null;
    }
}

export async function loginUserService(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        // Obtener el documento del usuario desde Firestore
        const userDocRef = doc(database, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            throw new Error(
                "No se encontró información del usuario en la base de datos."
            );
        }

        // @ts-expect-error
        const userData = { id: user.uid, ...(userDocSnap.data() as IUser) };

        Toast.success("Ingreso exitoso");
        return userData as IUser;
    } catch (error) {
        Toast.error("HOLA")
        // @ts-expect-error
        Toast.error(getCustomErrorMessage(error.code));
        return null;
    }
}

export default async function resetPasswordUserService(email: string) {
    try {
        await sendPasswordResetEmail(auth, email);
        Toast.info(
            "Si el correo esta registrado, recibirá las instrucciones por el mismo"
        );
        return;
    } catch (error) {
        Toast.error(getCustomErrorMessage((error as any).code));
        return null;
    }
}

export async function updateUserService(user: Partial<UserRegister>) {
    const { name, lastName, email, phone, countryCode } = user;

    const auth = getAuth();

    try {
        if (auth.currentUser?.email !== email && auth.currentUser && email) {
            await updateEmail(auth.currentUser, email);
        }

        if (auth.currentUser) {

            const userRef = doc(database, "users", auth.currentUser.uid);
            await updateDoc(userRef, {
                name,
                lastName,
                email,
                countryCode,
                phone,
            });

            Toast.success("Perfil actualizado con éxito");
        }
    } catch (error) {
        console.error("Error al actualizar en Auth:", (error as any).message);
    }
}

export async function updatePasswordService(newPassword: string) {
    const auth = getAuth();

    try {
        if (auth.currentUser) {
            await updatePassword(auth.currentUser, newPassword);
            Toast.success("Contraseña actualizada con éxito");
        }
    } catch (error) {
        Toast.error(getCustomErrorMessage((error as any).code));
    }
}