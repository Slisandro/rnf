import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
// import { loginUserService } from "../firebase/auth/services";
// import { useSession } from "../contexts/authentication";

export default function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const { signIn } = useSession();

  // Validaciones
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Is required.")
      .required("Is required."),
    password: Yup.string()
      .min(6, "Minimum 6 characters.")
      .required("Is required."),
  });

  // Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      setLoading(true);

      try {
        // const user = await loginUserService(email, password);
        if (true) { // user
          // signIn(user);
          // Redirige al dashboard después del registro
          router.replace("/(tabs)");
        }
      } catch (err) {
        console.log({ err });
      }

      setLoading(false);
    },
  });

  return { ...formik, loading };
}