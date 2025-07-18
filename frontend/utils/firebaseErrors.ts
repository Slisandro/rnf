enum ErrorCode {
    // Registration errors
    "auth/email-already-in-use",
    "auth/invalid-email",
    "auth/weak-password",
    "auth/missing-password",
    "auth/operation-not-allowed",

    // Login errors
    "auth/user-not-found",
    "auth/wrong-password",
    "auth/invalid-credential",

    // General errors
    "auth/network-request-failed",
    "auth/too-many-requests",
    "auth/internal-error",

    // Update password
    "auth/requires-recent-login"
}

export default function getCustomErrorMessage(errorCode: ErrorCode) {
    console.log(errorCode);
    const errorMessages = {
        "auth/email-already-in-use": "This email is already in use. Try another one.",
        "auth/invalid-email": "The email format is not valid.",
        "auth/weak-password": "The password must be at least 6 characters long.",
        "auth/missing-password": "You must enter a password.",
        "auth/operation-not-allowed":
            "Email and password registration is currently disabled.",

        "auth/user-not-found": "No account found with this email. Please sign up first.",
        "auth/wrong-password": "Incorrect password.",
        "auth/invalid-credential": "Email or password is incorrect.",

        "auth/network-request-failed": "Network error. Please check your internet connection.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
        "auth/internal-error": "An unexpected error occurred. Please try again.",

        "auth/requires-recent-login":
            "Please log in again and try the operation once more."
    };

    // @ts-expect-error
    return errorMessages[errorCode] || "An unexpected error occurred.";
}
