import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";

export default function Privacy() {
    const { language } = useLanguage();

    return (
        <div className="min-h-screen bg-white text-primary">
            <div className="pt-32 pb-20 px-6 container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                >
                    <header className="space-y-4">
                        <span className="text-accent font-black tracking-[0.5em] uppercase text-[10px]">Security & Legal</span>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter">Privacy Policy</h1>
                    </header>

                    <div className="prose prose-lg max-w-none space-y-8 text-primary/70 leading-relaxed font-light">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-serif font-bold text-primary">1. Information We Collect</h2>
                            <p>
                                At ABI Fashion Designer, we collect personal information necessary to provide our bespoke tailoring services. This includes your name, contact details (phone number, email), and measurements for custom fit garments.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-serif font-bold text-primary">2. How We Use Your Data</h2>
                            <p>
                                Your data is exclusively used to process your orders, schedule consultations, and communicate about your bespoke designs. We do not sell or share your personal information with third parties for marketing purposes.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-serif font-bold text-primary">3. WhatsApp Communications</h2>
                            <p>
                                Our website uses WhatsApp for direct inquiries. When you contact us via WhatsApp, your phone number and chat history are managed within the WhatsApp platform according to their privacy policies.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-serif font-bold text-primary">4. Data Security</h2>
                            <p>
                                We implement industry-standard security measures to protect your information both online and offline in our physical studio located in Tamil Nadu.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
