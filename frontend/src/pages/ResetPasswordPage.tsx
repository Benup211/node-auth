import { FC, ReactElement, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "../state/authState";
import FormInput from "../components/FormInput";
import { Loader, Lock } from "lucide-react";
import toast from "react-hot-toast";
const ResetPasswordPage: FC = (): ReactElement => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { resetPassword, error, isLoading, message } = useAuthState();
    const { resetPasswordToken } = useParams();
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await resetPassword(password, confirmPassword, resetPasswordToken);
            toast.success("Password reset successfully");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-md w-full bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl border overflow-hidden"
        >
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-t from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Reset Password
                </h2>
                <form onSubmit={handleSubmit}>
                    <p className="text-gray-300 mb-6 text-center">
                        Enter your new password and confirm it.
                    </p>
                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center">
                            {error}
                        </p>
                    )}
                    {message && (
                        <p className="text-green-500 text-sm mb-4 text-center">
                            {message}
                        </p>
                    )}
                    <FormInput
                        Icon={Lock}
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <FormInput
                        Icon={Lock}
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader className="size-6 animate-spin mx-auto" />
                        ) : (
                            "Set New Password"
                        )}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

export default ResetPasswordPage;
