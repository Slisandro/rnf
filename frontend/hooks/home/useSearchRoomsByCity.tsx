import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { searchRoomsByCityService } from "@/services/rooms"; // asegúrate de crear esto

export default function useSearchRoomsByCity() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState<string>();

    const validationSchema = Yup.object().shape({
        city: Yup.string().required("City is required."),
    });

    const formik = useFormik({
        initialValues: {
            city: "",
        },
        validationSchema,
        onSubmit: async ({ city }) => {
            setLoading(true);
            setError("");

            try {
                // const data = await searchRoomsByCityService(city);
                setResults([]);
            } catch (err) {
                console.error(err);
                setError("Something went wrong. Please try again.");
            }

            setLoading(false);
        },
    });

    return {
        ...formik,
        loading,
        results,
        error,
    };
}
