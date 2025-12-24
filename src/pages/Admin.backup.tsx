import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Plus, Edit, Trash2, LogOut, X, LayoutGrid, Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
    const navigate = useNavigate();
    const { isAdmin, logout } = useAdmin();
    const { language, t } = useLanguage();
    const works = useQuery(api.works.getAllWorks);
    const deleteWork = useMutation(api.works.deleteWork);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedWork, setSelectedWork] = useState<any>(null);

    useEffect(() => {
        if (!isAdmin) {
            navigate("/");
        }
    }, [isAdmin, navigate]);

    const handleDelete = async (id: string) => {
        if (confirm(language === "ta" ? "இந்த வேலையை நீக்க விரும்புகிறீர்களா?" : "Are you sure you want to delete this work?")) {
            try {
                await deleteWork({ id: id as any });
            } catch (error) {
                console.error("Delete error:", error);
            }
        }
    };

    if (!isAdmin) return null;

    return (
        <div className="min-h-screen bg-surface-muted pb-20 pt-24">
            <main className="container mx-auto max-w-7xl px-6">
                {/* Header Interface */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-accent">
                            <LayoutGrid size={18} />
                            <span className="text-[10px] uppercase tracking-[0.4em] font-black">Management Portal</span>
                        </div>
                        <h1 className={`text-6xl font-serif text-primary tracking-tighter ${language === "ta" ? "tamil-text" : ""}`}>
                            {t("adminSettings")}
                        </h1>
                        <p className="text-muted text-lg font-light">Curate your portfolio and showcase your latest couture masterpieces.</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search Archive..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 pr-6 py-4 bg-white border border-border rounded-2xl text-[10px] uppercase tracking-widest font-bold focus:ring-2 focus:ring-accent outline-none w-64 transition-all"
                            />
                            <LayoutGrid size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" />
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="btn-premium bg-primary text-white hover:bg-accent ring-offset-2 focus:ring-2 focus:ring-accent transition-all shadow-glow"
                        >
                            <span className="flex items-center gap-3">
                                <Plus size={16} />
                                {t("addNewWork")}
                            </span>
                        </button>
                        <button
                            onClick={logout}
                            className="p-4 bg-white border border-border rounded-2xl text-red-500 hover:bg-red-50 transition-all font-black uppercase text-[10px] tracking-widest shadow-sm"
                            title="Secure Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>

                {/* Filter Suite */}
                <div className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
                    {["All", "Blouse", "Salwar", "Frock", "Kids"].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={cn(
                                "px-8 py-3 rounded-full text-[9px] uppercase tracking-[0.2em] font-black transition-all border",
                                filterCategory === cat
                                    ? "bg-accent border-accent text-white shadow-glow"
                                    : "bg-white border-border text-muted hover:border-accent hover:text-accent"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Dashboard Grid / Table */}
                <div className="bg-white rounded-[3rem] shadow-premium border border-border/40 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-surface-muted/50 border-b border-border/40">
                                <tr>
                                    <th className="px-10 py-8 text-[10px] uppercase tracking-[0.3em] font-black text-muted">Category</th>
                                    <th className="px-10 py-8 text-[10px] uppercase tracking-[0.3em] font-black text-muted">Exhibition Title</th>
                                    <th className="px-10 py-8 text-[10px] uppercase tracking-[0.3em] font-black text-muted text-center">Gallery</th>
                                    <th className="px-10 py-8 text-[10px] uppercase tracking-[0.3em] font-black text-muted text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/20">
                                {!works ? (
                                    <tr>
                                        <td colSpan={4} className="px-10 py-32 text-center">
                                            <div className="flex flex-col items-center gap-4 animate-fade-in">
                                                <div className="w-10 h-10 border-[3px] border-accent border-t-transparent rounded-full animate-spin" />
                                                <span className="text-xs font-black uppercase tracking-widest text-muted">Synchronizing with Studio...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : works.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-10 py-32 text-center">
                                            <div className="flex flex-col items-center gap-6 opacity-30">
                                                <ImageIcon size={48} strokeWidth={1} />
                                                <p className="font-serif text-2xl">The archive is currently empty.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    (works as any[])
                                        .filter(w => filterCategory === "All" || w.category === filterCategory)
                                        .filter(w =>
                                            w.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            w.title_ta.includes(searchTerm) ||
                                            w.category.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((work) => (
                                            <motion.tr
                                                key={work._id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="hover:bg-surface-muted/30 transition-colors group"
                                            >
                                                <td className="px-10 py-8">
                                                    <span className="px-4 py-1.5 bg-accent/5 text-accent rounded-full text-[9px] font-black uppercase tracking-widest border border-accent/10">
                                                        {work.category}
                                                    </span>
                                                </td>
                                                <td className={`px-10 py-8 font-serif text-2xl text-primary ${language === "ta" ? "tamil-text" : ""}`}>
                                                    {language === "ta" ? work.title_ta : work.title_en}
                                                </td>
                                                <td className="px-10 py-8">
                                                    <div className="flex items-center justify-center gap-3 text-muted">
                                                        <div className="flex -space-x-4">
                                                            {work.images?.slice(0, 3).map((img: any, i: number) => (
                                                                <div key={i} className="w-10 h-10 rounded-xl border-2 border-white overflow-hidden shadow-sm bg-surface-muted">
                                                                    <img src={img} className="w-full h-full object-cover" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {work.images?.length > 3 && <span className="text-[10px] font-black tracking-widest text-accent">+{work.images.length - 3}</span>}
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedWork(work);
                                                                setShowEditModal(true);
                                                            }}
                                                            className="p-4 text-primary hover:bg-white rounded-2xl shadow-sm border border-border transition-all hover:text-accent"
                                                            title="Edit Piece"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(work._id)}
                                                            className="p-4 text-red-500 hover:bg-red-50 rounded-2xl shadow-sm border border-red-100 transition-all"
                                                            title="Remove from Archive"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <AnimatePresence>
                {showAddModal && (
                    <AddWorkModal
                        onClose={() => setShowAddModal(false)}
                        language={language}
                        t={t}
                    />
                )}
                {showEditModal && selectedWork && (
                    <EditWorkModal
                        work={selectedWork}
                        onClose={() => {
                            setShowEditModal(false);
                            setSelectedWork(null);
                        }}
                        language={language}
                        t={t}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

function EditWorkModal({ work, onClose, language, t }: { work: any, onClose: () => void, language: string, t: any }) {
    const updateWork = useMutation(api.works.updateWork);
    const [formData, setFormData] = useState({
        id: work._id,
        category: work.category,
        title_en: work.title_en,
        title_ta: work.title_ta,
        description_en: work.description_en,
        description_ta: work.description_ta,
        imageUrl: work.images?.[0] || ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const categories = ["Blouse", "Salwar", "Frock", "Kids"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { id, imageUrl, ...rest } = formData;
            await updateWork({
                id: id as any,
                category: rest.category,
                title_en: rest.title_en,
                title_ta: rest.title_ta,
                description_en: rest.description_en,
                description_ta: rest.description_ta,
                images: [imageUrl],
                isActive: true
            });
            setStatus('success');
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            console.error("Error updating work:", error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-primary/20 backdrop-blur-xl">
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white rounded-[3.5rem] p-12 max-w-3xl w-full shadow-premium relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
                {/* Status Overlays */}
                <AnimatePresence>
                    {status === 'success' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center gap-6">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-3xl font-serif">Piece Updated Successfully</h3>
                            <p className="text-muted font-black uppercase tracking-widest text-[10px]">Syncing changes...</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between items-start mb-12">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-accent">
                            <Edit size={16} />
                            <span className="text-[10px] uppercase tracking-[0.4em] font-black">Edit Masterpiece</span>
                        </div>
                        <h2 className={`text-4xl font-serif text-primary ${language === "ta" ? "tamil-text" : ""}`}>
                            Refine Studio Piece
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-4 hover:bg-surface-muted rounded-full transition-all text-muted"><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Category */}
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-muted px-1">Curated Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-surface-muted border-none rounded-2xl px-8 py-5 outline-none ring-1 ring-border/40 focus:ring-accent transition-all font-bold text-sm text-primary appearance-none"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        {/* Image URL */}
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-muted px-1">Visual Reference (URL)</label>
                            <input
                                required
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                placeholder="https://unsplash.com/..."
                                className="w-full bg-surface-muted border-none rounded-2xl px-8 py-5 outline-none ring-1 ring-border/40 focus:ring-accent transition-all text-sm font-medium"
                            />
                        </div>

                        {/* Title EN */}
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-muted px-1">Title (English Edition)</label>
                            <input
                                required
                                value={formData.title_en}
                                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                                className="w-full bg-surface-muted border-none rounded-2xl px-8 py-5 outline-none ring-1 ring-border/40 focus:ring-accent transition-all text-sm font-medium"
                            />
                        </div>

                        {/* Title TA */}
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-muted px-1">தலைப்பு (தமிழ் பதிப்பு)</label>
                            <input
                                required
                                value={formData.title_ta}
                                onChange={(e) => setFormData({ ...formData, title_ta: e.target.value })}
                                className="w-full bg-surface-muted border-none rounded-2xl px-8 py-5 outline-none ring-1 ring-border/40 focus:ring-accent transition-all text-sm font-medium"
                            />
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-muted px-1">Story (English)</label>
                            <textarea
                                value={formData.description_en}
                                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                                className="w-full bg-surface-muted border-none rounded-[2rem] px-8 py-6 outline-none ring-1 ring-border/40 focus:ring-accent transition-all min-h-[160px] text-sm font-medium resize-none shadow-inner"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-muted px-1">கதை (தமிழ்)</label>
                            <textarea
                                value={formData.description_ta}
                                onChange={(e) => setFormData({ ...formData, description_ta: e.target.value })}
                                className="w-full bg-surface-muted border-none rounded-[2rem] px-8 py-6 outline-none ring-1 ring-border/40 focus:ring-accent transition-all min-h-[160px] text-sm font-medium resize-none shadow-inner"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-10 pt-6">
                        <button type="button" onClick={onClose} className="text-[10px] uppercase tracking-[0.3em] font-black text-muted hover:text-red-500 transition-colors">Cancel Edit</button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-premium bg-primary text-white hover:bg-accent disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Updating...</span>
                                </div>
                            ) : "Update Piece"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}


function AddWorkModal({ onClose, language, t }: { onClose: () => void, language: string, t: any }) {
    const createWork = useMutation(api.works.createWork);
    const [formData, setFormData] = useState({
        category: "Blouse",
        title_en: "",
        title_ta: "",
        description_en: "",
        description_ta: "",
        imageUrl: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const categories = ["Blouse", "Salwar", "Frock", "Kids"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { imageUrl, ...rest } = formData;
            await createWork({
                ...rest,
                images: [imageUrl],
                isActive: true
            } as any);
            setStatus('success');
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            console.error("Error creating work:", error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-primary/20 backdrop-blur-xl">
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white rounded-[3.5rem] p-12 max-w-3xl w-full shadow-premium relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
                {/* Status Overlays */}
                <AnimatePresence>
                    {status === 'success' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center gap-6">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-3xl font-serif">Piece Archived Successfully</h3>
                            <p className="text-muted font-black uppercase tracking-widest text-[10px]">Updating your portfolio...</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between items-start mb-12">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-accent">
                            <Plus size={16} />
                            <span className="text-[10px] uppercase tracking-[0.4em] font-black">Curation Studio</span>
                        </div>
                        <h2 className={`text-4xl font-serif text-primary ${language === "ta" ? "tamil-text" : ""}`}>
                            Archive New Masterpiece
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-4 hover:bg-surface-muted rounded-full transition-all text-muted"><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Category */}
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-muted px-1">Curated Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-surface-muted border-none rounded-2xl px-8 py-5 outline-none ring-1 ring-border/40 focus:ring-accent transition-all font-bold text-sm text-primary appearance-none"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        {/* Image URL */}
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-muted px-1">Visual Reference (URL)</label>
                            <input
                                required
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                placeholder="https://unsplash.com/..."
                                className="w-full bg-surface-muted border-none rounded-2xl px-8 py-5 outline-none ring-1 ring-border/40 focus:ring-accent transition-all text-sm font-medium"
                            />
                        </div>

                        {/* Title EN */}
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-muted px-1">Title (English Edition)</label>
                            <input
                                required
                                value={formData.title_en}
                                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                                className="w-full bg-surface-muted border-none rounded-2xl px-8 py-5 outline-none ring-1 ring-border/40 focus:ring-accent transition-all text-sm font-medium"
                            />
                        </div>

                        {/* Title TA */}
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-muted px-1">தலைப்பு (தமிழ் பதிப்பு)</label>
                            <input
                                required
                                value={formData.title_ta}
                                onChange={(e) => setFormData({ ...formData, title_ta: e.target.value })}
                                className="w-full bg-surface-muted border-none rounded-2xl px-8 py-5 outline-none ring-1 ring-border/40 focus:ring-accent transition-all text-sm font-medium"
                            />
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-muted px-1">Story (English)</label>
                            <textarea
                                value={formData.description_en}
                                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                                className="w-full bg-surface-muted border-none rounded-[2rem] px-8 py-6 outline-none ring-1 ring-border/40 focus:ring-accent transition-all min-h-[160px] text-sm font-medium resize-none shadow-inner"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-muted px-1">கதை (தமிழ்)</label>
                            <textarea
                                value={formData.description_ta}
                                onChange={(e) => setFormData({ ...formData, description_ta: e.target.value })}
                                className="w-full bg-surface-muted border-none rounded-[2rem] px-8 py-6 outline-none ring-1 ring-border/40 focus:ring-accent transition-all min-h-[160px] text-sm font-medium resize-none shadow-inner"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-10 pt-6">
                        <button type="button" onClick={onClose} className="text-[10px] uppercase tracking-[0.3em] font-black text-muted hover:text-red-500 transition-colors">Abort Curation</button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-premium bg-primary text-white hover:bg-accent disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Syncing...</span>
                                </div>
                            ) : "Archive Piece"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
