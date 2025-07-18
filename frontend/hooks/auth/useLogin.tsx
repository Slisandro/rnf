import { useSession } from "@/contexts/authentication";
import { loginUserService } from "@/services/auth";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { signIn } = useSession();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Is required.")
      .required("Is required."),
    password: Yup.string()
      .min(6, "Minimum 6 characters.")
      .required("Is required."),
  });

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
        const user = await loginUserService(email, password);
        if (user) {
          signIn(user);
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