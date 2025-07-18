import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
// import resetPassword, { loginUserService } from "../firebase/auth/services";

export default function useResetPassword() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Validaciones
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email.")
            .required("Is required."),
    });

    // Formik para manejar el formulario
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            const { email } = values;
            setLoading(true);

            try {
                // await resetPassword(email);
                router.replace("/login");
            } catch (err) {
                console.log({ err });
            }

            setLoading(false);
        },
    });

    return { ...formik, loading };
}