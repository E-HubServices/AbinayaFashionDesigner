import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const navigate = useNavigate();
    const { login } = useAdmin();
    const { language } = useLanguage();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const isValid = await login(password);

            if (isValid) {
                setSuccess(true);
                setTimeout(() => {
                    navigate("/admin");
                    onClose();
                    setPassword("");
                    setSuccess(false);
                }, 1500);
            } else {
                setError(language === "ta" ? "தவறான கடவுச்சொல்" : "Invalid password");
                setPassword("");
            }
        } catch (err) {
            setError(language === "ta" ? "உள்நுழைவில் பிழை" : "Login error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading && !success) {
            setPassword("");
            setError("");
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-primary/20 backdrop-blur-xl">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="bg-white rounded-[3rem] p-12 max-w-md w-full shadow-premium relative overflow-hidden"
                    >
                        {/* Success Overlay */}
                        <AnimatePresence>
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center gap-6"
                                >
                                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h3 className="text-3xl font-serif text-primary">
                                        {language === "ta" ? "வெற்றிகரமாக உள்நுழைந்தீர்கள்" : "Login Successful"}
                                    </h3>
                                    <p className="text-muted font-black uppercase tracking-widest text-[10px]">
                                        {language === "ta" ? "திசைதிருப்புகிறது..." : "Redirecting..."}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            disabled={isLoading || success}
                            className="absolute top-8 right-8 p-3 hover:bg-surface-muted rounded-full transition-all text-muted disabled:opacity-50"
                        >
                            <X size={24} />
                        </button>

                        {/* Header */}
                        <div className="text-center mb-10 space-y-4">
                            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                                <Lock size={28} className="text-primary" />
                            </div>
                            <h2 className={`text-4xl font-serif text-primary ${language === "ta" ? "tamil-text" : ""}`}>
                                {language === "ta" ? "ஊழியர் நுழைவு" : "Staff Portal"}
                            </h2>
                            <p className="text-muted text-sm font-medium">
                                {language === "ta"
                                    ? "நிர்வாக அணுகலுக்கு உங்கள் கடவுச்சொல்லை உள்ளிடவும்"
                                    : "Enter your password to access the admin dashboard"}
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-muted px-1">
                                    {language === "ta" ? "கடவுச்சொல்" : "Password"}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError("");
                                        }}
                                        placeholder={language === "ta" ? "உங்கள் கடவுச்சொல்லை உள்ளிடவும்" : "Enter your password"}
                                        className="w-full bg-surface-muted border-none rounded-2xl pl-12 pr-14 py-5 outline-none ring-1 ring-border/40 focus:ring-accent transition-all text-sm font-medium"
                                        required
                                        autoFocus
                                        disabled={isLoading || success}
                                    />
                                    <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                                        disabled={isLoading || success}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl"
                                    >
                                        <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                                        <p className="text-sm font-medium text-red-700">{error}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || success || !password}
                                className="w-full btn-premium bg-primary text-white hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>{language === "ta" ? "சரிபார்க்கிறது..." : "Verifying..."}</span>
                                    </div>
                                ) : (
                                    <span>{language === "ta" ? "உள்நுழைய" : "Login"}</span>
                                )}
                            </button>
                        </form>

                        {/* Footer Note */}
                        <div className="mt-8 pt-6 border-t border-border/40">
                            <p className="text-center text-[10px] uppercase tracking-widest text-muted/60 font-black">
                                {language === "ta"
                                    ? "அங்கீகரிக்கப்பட்ட பணியாளர்களுக்கு மட்டும்"
                                    : "Authorized Staff Only"}
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
