import { registerUserService } from "@/services/auth";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function useRegister() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Validaciones
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Is required."),
        lastName: Yup.string().required("Is required."),
        email: Yup.string().email("Invalid email.").required("Is required."),
        countryCode: Yup.string()
            .matches(/^\+\d{1,4}$/, "Invalid prefix.")
            .required("Is required."),
        phone: Yup.string()
            .matches(/^\d{7,12}$/, "Invalid telephone.")
            .required("Is required."),
        password: Yup.string()
            .min(6, "Minimum 6 characters.")
            .required("Is required."),
    });

    // Formik para manejar el formulario
    const formik = useFormik({
        initialValues: {
            name: "",
            lastName: "",
            email: "",
            countryCode: "",
            phone: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);

            try {
                const user = await registerUserService(values);
                if (user) {
                    router.replace("/login");
                }
            } catch (err) {
                console.log({ err })
            }

            setLoading(false);
        },
    });

    return { ...formik, loading };
}