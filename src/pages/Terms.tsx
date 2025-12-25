import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";

export default function Terms() {
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
                        <span className="text-accent font-black tracking-[0.5em] uppercase text-[10px]">Guidelines</span>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter">Terms of Service</h1>
                    </header>

                    <div className="prose prose-lg max-w-none space-y-8 text-primary/70 leading-relaxed font-light">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-serif font-bold text-primary">1. Bespoke Orders</h2>
                            <p>
                                Every piece at ABI Fashion Designer is custom-made. Detailed measurements and design specifications are finalized during the initial consultation. Any changes after the cutting process has begun may incur additional costs.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-serif font-bold text-primary">2. Payment Terms</h2>
                            <p>
                                For custom bridal and Aari orders, a deposit is required to initiate the design process. Full payment must be settled before or during the final delivery/pickup.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-serif font-bold text-primary">3. Delivery & Timeline</h2>
                            <p>
                                Intricate Aari and bridal work requires significant time. Estimated timelines are provided at the time of order but may vary slightly based on design complexity. We recommend booking at least 1 month in advance for major bridal pieces.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-serif font-bold text-primary">4. Returns & Refunds</h2>
                            <p>
                                Due to the personalized nature of bespoke tailoring, we do not offer returns or refunds on completed custom orders. However, we provide complimentary fitting adjustments within 7 days of delivery.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
