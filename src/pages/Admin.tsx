import { useEffect, useState, useRef } from "react";
import { Plus, Edit, Trash2, LogOut, X, LayoutGrid, Image as ImageIcon, CheckCircle2, Upload, IndianRupee, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function AdminPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedWork, setSelectedWork] = useState<any>(null);

    // Fetch works from Convex
    const works = useQuery(api.works.getAllWorks) || [];
    const deleteWork = useMutation(api.works.deleteWork);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this work?")) {
            try {
                // @ts-ignore
                await deleteWork({ id });
            } catch (error) {
                console.error("Failed to delete work:", error);
                alert("Failed to delete work. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-white pb-20 pt-24">
            <main className="container mx-auto max-w-7xl px-6">
                {/* Header Interface */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-teal-600">
                            <LayoutGrid size={20} strokeWidth={2.5} />
                            <span className="text-xs uppercase tracking-[0.4em] font-black">Management Portal</span>
                        </div>
                        <h1 className="text-7xl font-serif text-gray-900 tracking-tighter font-bold">
                            Admin Settings
                        </h1>
                        <p className="text-lg text-gray-600 font-medium max-w-2xl leading-relaxed">
                            Curate your portfolio and showcase your latest couture masterpieces for ladies and kids.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search Archive..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-14 pr-8 py-5 bg-gray-50 border-2 border-gray-200 rounded-3xl text-sm font-semibold focus:ring-4 focus:ring-teal-100 focus:border-teal-500 outline-none w-72 transition-all shadow-lg text-gray-900"
                            />
                            <LayoutGrid size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="px-8 py-5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-3xl font-black uppercase text-xs tracking-widest hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3 shadow-xl"
                        >
                            <Plus size={20} strokeWidth={3} />
                            Add New Work
                        </button>
                        <button
                            className="p-5 bg-gray-50 border-2 border-red-200 rounded-3xl text-red-600 hover:bg-red-50 transition-all font-black shadow-lg hover:shadow-xl"
                            title="Secure Logout"
                        >
                            <LogOut size={20} strokeWidth={2.5} />
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
                                "px-10 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-black transition-all border-2 shadow-lg whitespace-nowrap",
                                filterCategory === cat
                                    ? "bg-gradient-to-r from-teal-600 to-teal-700 border-teal-600 text-white shadow-2xl scale-105"
                                    : "bg-gray-50 border-gray-200 text-gray-700 hover:border-teal-500 hover:text-teal-700 hover:scale-105"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Dashboard Grid / Table */}
                <div className="bg-gray-50 rounded-[4rem] shadow-2xl border-2 border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gradient-to-r from-teal-50 to-teal-100 border-b-2 border-gray-200">
                                <tr>
                                    <th className="px-10 py-8 text-xs uppercase tracking-[0.3em] font-black text-gray-900">Category</th>
                                    <th className="px-10 py-8 text-xs uppercase tracking-[0.3em] font-black text-gray-900">Exhibition Title</th>
                                    <th className="px-10 py-8 text-xs uppercase tracking-[0.3em] font-black text-gray-900 text-center">Gallery</th>
                                    <th className="px-10 py-8 text-xs uppercase tracking-[0.3em] font-black text-gray-900 text-center">Price</th>
                                    <th className="px-10 py-8 text-xs uppercase tracking-[0.3em] font-black text-gray-900 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {works
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
                                            className="hover:bg-teal-50 transition-all group"
                                        >
                                            <td className="px-10 py-8">
                                                <span className="px-5 py-2 bg-gradient-to-r from-teal-50 to-teal-100 text-teal-700 rounded-full text-xs font-black uppercase tracking-widest border-2 border-teal-200">
                                                    {work.category}
                                                </span>
                                            </td>
                                            <td className="px-10 py-8 font-serif text-2xl font-bold text-gray-900">
                                                {work.title_en}
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center justify-center gap-3">
                                                    <div className="flex -space-x-4">
                                                        {work.images?.filter((img: any) => img).slice(0, 3).map((img: any, i: number) => (
                                                            <div key={i} className="w-12 h-12 rounded-2xl border-4 border-white overflow-hidden shadow-lg bg-gray-100 ring-2 ring-gray-200">
                                                                <img src={img} className="w-full h-full object-cover" alt="" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {work.images?.filter((img: any) => img).length > 3 && <span className="text-xs font-black tracking-widest text-teal-600">+{work.images.filter((img: any) => img).length - 3}</span>}
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 text-center">
                                                {work.price ? (
                                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full font-bold text-sm border-2 border-emerald-200">
                                                        <IndianRupee size={14} strokeWidth={3} />
                                                        {work.price.toLocaleString('en-IN')}
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-gray-400 font-semibold">Not Set</span>
                                                )}
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedWork(work);
                                                            setShowEditModal(true);
                                                        }}
                                                        className="p-4 text-gray-700 hover:bg-white rounded-2xl shadow-lg border-2 border-gray-200 transition-all hover:text-teal-600 hover:scale-110 hover:shadow-xl"
                                                        title="Edit Piece"
                                                    >
                                                        <Edit size={18} strokeWidth={2.5} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(work._id)}
                                                        className="p-4 text-red-500 hover:bg-red-50 rounded-2xl shadow-lg border-2 border-red-100 transition-all hover:scale-110 hover:shadow-xl"
                                                        title="Remove from Archive"
                                                    >
                                                        <Trash2 size={18} strokeWidth={2.5} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <AnimatePresence>
                {showAddModal && (
                    <AddWorkModal
                        onClose={() => setShowAddModal(false)}
                    />
                )}
                {showEditModal && selectedWork && (
                    <EditWorkModal
                        work={selectedWork}
                        onClose={() => {
                            setShowEditModal(false);
                            setSelectedWork(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

function EditWorkModal({ work, onClose }: { work: any, onClose: () => void }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const updateWork = useMutation(api.works.updateWork);

    const [formData, setFormData] = useState({
        id: work._id,
        category: work.category,
        title_en: work.title_en,
        title_ta: work.title_ta,
        description_en: work.description_en,
        description_ta: work.description_ta,
        imageUrl: work.images?.[0] || "",
        price: work.price || "",
        customField1_label: work.customField1_label || "",
        customField1_value: work.customField1_value || "",
        customField2_label: work.customField2_label || "",
        customField2_value: work.customField2_value || "",
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const categories = ["Blouse", "Salwar", "Frock", "Kids"];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');

        try {
            let finalImageId = formData.imageUrl;
            let shouldUpdateImages = false;

            // Handle Image Upload
            if (selectedFile) {
                setIsUploading(true);
                const postUrl = await generateUploadUrl();

                const result = await fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": selectedFile.type },
                    body: selectedFile,
                });

                if (!result.ok) throw new Error("Upload failed");
                const { storageId } = await result.json();
                finalImageId = storageId;
                setIsUploading(false);
                shouldUpdateImages = true;
            } else if (finalImageId !== (work.images?.[0] || "")) {
                shouldUpdateImages = true;
            }

            const updatePayload: any = {
                id: work._id,
                category: formData.category,
                title_en: formData.title_en,
                title_ta: formData.title_ta,
                description_en: formData.description_en,
                description_ta: formData.description_ta,
                price: Number(formData.price) || 0,
                customField1_label: formData.customField1_label,
                customField1_value: formData.customField1_value,
                customField2_label: formData.customField2_label,
                customField2_value: formData.customField2_value,
            };

            if (shouldUpdateImages) {
                updatePayload.images = finalImageId ? [finalImageId] : [];
            }

            await updateWork(updatePayload);

            setStatus('success');
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            console.error("Failed to update work:", error);
            setStatus('error');
            alert("Failed to update work. Please try again.");
        } finally {
            setIsSubmitting(false);
            setIsUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md">
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white rounded-[4rem] p-14 max-w-5xl w-full shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto border-4 border-gray-100"
            >
                <AnimatePresence>
                    {status === 'success' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center gap-6">
                            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-2xl">
                                <CheckCircle2 size={48} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-4xl font-serif font-bold text-gray-900">Piece Updated Successfully</h3>
                            <p className="text-gray-600 font-black uppercase tracking-widest text-sm">Syncing changes...</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between items-start mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-teal-600">
                            <Edit size={20} strokeWidth={2.5} />
                            <span className="text-xs uppercase tracking-[0.4em] font-black">Edit Masterpiece</span>
                        </div>
                        <h2 className="text-5xl font-serif font-bold text-gray-900">
                            Refine Studio Piece
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-5 hover:bg-gray-50 rounded-full transition-all text-gray-600 hover:text-gray-900">
                        <X size={28} strokeWidth={2.5} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.3em] font-black text-gray-900 px-1 flex items-center gap-2">
                                <Tag size={14} />
                                Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-3xl px-8 py-5 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all font-bold text-base text-gray-900"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.3em] font-black text-gray-900 px-1 flex items-center gap-2">
                                <IndianRupee size={14} />
                                Price (INR)
                            </label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="e.g., 2500"
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-3xl px-8 py-5 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all text-base font-semibold text-gray-900"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.3em] font-black text-gray-900 px-1 flex items-center gap-2">
                                <Upload size={14} />
                                Upload Photo
                            </label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className={cn(
                                    "w-full rounded-3xl px-8 py-5 font-black uppercase text-xs tracking-widest hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3",
                                    selectedFile ? "bg-emerald-600 text-white" : "bg-gradient-to-r from-teal-600 to-teal-700 text-white"
                                )}
                            >
                                {isUploading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Uploading...
                                    </>
                                ) : selectedFile ? (
                                    <>
                                        <CheckCircle2 size={16} />
                                        {selectedFile.name.slice(0, 12)}...
                                    </>
                                ) : (
                                    <>
                                        <Upload size={16} />
                                        Choose File
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs uppercase tracking-[0.3em] font-black text-gray-900 px-1">Or Enter Image URL</label>
                        <input
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            className="w-full bg-gray-50 border-2 border-gray-200 rounded-3xl px-8 py-5 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all text-base font-medium text-gray-900"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.3em] font-black text-gray-900 px-1">Title (English)</label>
                            <input
                                required
                                value={formData.title_en}
                                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-3xl px-8 py-5 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all text-base font-semibold text-gray-900"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.3em] font-black text-gray-900 px-1">தலைப்பு (தமிழ்)</label>
                            <input
                                required
                                value={formData.title_ta}
                                onChange={(e) => setFormData({ ...formData, title_ta: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-3xl px-8 py-5 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all text-base font-semibold text-gray-900"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.3em] font-black text-gray-900 px-1">Description (English)</label>
                            <textarea
                                value={formData.description_en}
                                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-[2rem] px-8 py-6 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all min-h-[140px] text-base font-medium resize-none text-gray-900"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.3em] font-black text-gray-900 px-1">விவரம் (தமிழ்)</label>
                            <textarea
                                value={formData.description_ta}
                                onChange={(e) => setFormData({ ...formData, description_ta: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-[2rem] px-8 py-6 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all min-h-[140px] text-base font-medium resize-none text-gray-900"
                            />
                        </div>
                    </div>

                    <div className="border-t-2 border-gray-200 pt-10">
                        <h3 className="text-sm uppercase tracking-widest font-black text-gray-900 mb-6">Custom Fields (Optional)</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <input
                                    value={formData.customField1_label}
                                    onChange={(e) => setFormData({ ...formData, customField1_label: e.target.value })}
                                    placeholder="Field 1 Label (e.g., Fabric Type)"
                                    className="w-full bg-amber-50 border-2 border-amber-200 rounded-3xl px-8 py-4 outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 transition-all text-sm font-bold text-gray-900"
                                />
                                <input
                                    value={formData.customField1_value}
                                    onChange={(e) => setFormData({ ...formData, customField1_value: e.target.value })}
                                    placeholder="Field 1 Value (e.g., Pure Silk)"
                                    className="w-full bg-amber-50 border-2 border-amber-200 rounded-3xl px-8 py-4 outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 transition-all text-sm font-medium text-gray-900"
                                />
                            </div>
                            <div className="space-y-4">
                                <input
                                    value={formData.customField2_label}
                                    onChange={(e) => setFormData({ ...formData, customField2_label: e.target.value })}
                                    placeholder="Field 2 Label (e.g., Stitching Time)"
                                    className="w-full bg-amber-50 border-2 border-amber-200 rounded-3xl px-8 py-4 outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 transition-all text-sm font-bold text-gray-900"
                                />
                                <input
                                    value={formData.customField2_value}
                                    onChange={(e) => setFormData({ ...formData, customField2_value: e.target.value })}
                                    placeholder="Field 2 Value (e.g., 3-5 Days)"
                                    className="w-full bg-amber-50 border-2 border-amber-200 rounded-3xl px-8 py-4 outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 transition-all text-sm font-medium text-gray-900"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-8 pt-8">
                        <button type="button" onClick={onClose} className="text-sm uppercase tracking-[0.3em] font-black text-gray-600 hover:text-red-600 transition-colors">
                            Cancel Edit
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-12 py-5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-3xl font-black uppercase text-sm tracking-widest hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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



function AddWorkModal({ onClose }: { onClose: () => void }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const createWork = useMutation(api.works.createWork);

    const [formData, setFormData] = useState({
        category: "Blouse",
        title_en: "",
        title_ta: "",
        description_en: "",
        description_ta: "",
        imageUrl: "",
        price: "",
        customField1_label: "",
        customField1_value: "",
        customField2_label: "",
        customField2_value: "",
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const categories = ["Blouse", "Salwar", "Frock", "Kids"];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');

        try {
            let finalImageId = formData.imageUrl;

            // Handle Image Upload
            if (selectedFile) {
                setIsUploading(true);
                const postUrl = await generateUploadUrl();

                const result = await fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": selectedFile.type },
                    body: selectedFile,
                });

                if (!result.ok) throw new Error("Upload failed");
                const { storageId } = await result.json();
                finalImageId = storageId;
                setIsUploading(false);
            }

            if (!finalImageId) {
                alert("Please provide an image URL or upload a photo.");
                setIsSubmitting(false);
                return;
            }

            await createWork({
                category: formData.category,
                title_en: formData.title_en,
                title_ta: formData.title_ta,
                description_en: formData.description_en,
                description_ta: formData.description_ta,
                images: [finalImageId],
                price: Number(formData.price) || 0,
                customField1_label: formData.customField1_label,
                customField1_value: formData.customField1_value,
                customField2_label: formData.customField2_label,
                customField2_value: formData.customField2_value,
            });

            setStatus('success');
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            console.error("Failed to add work:", error);
            setStatus('error');
            alert("Failed to add work. Please try again.");
        } finally {
            setIsSubmitting(false);
            setIsUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md">
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white rounded-[4rem] p-14 max-w-5xl w-full shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto border-4 border-gray-100"
            >
                <AnimatePresence>
                    {status === 'success' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center gap-6">
                            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-2xl">
                                <CheckCircle2 size={48} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-4xl font-serif font-bold text-gray-900">Piece Added Successfully</h3>
                            <p className="text-gray-600 font-black uppercase tracking-widest text-sm">Updating portfolio...</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between items-start mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-teal-600">
                            <Plus size={20} strokeWidth={2.5} />
                            <span className="text-xs uppercase tracking-[0.4em] font-black">Curation Studio</span>
                        </div>
                        <h2 className="text-5xl font-serif font-bold text-gray-900">
                            Archive New Masterpiece
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-5 hover:bg-gray-50 rounded-full transition-all text-gray-600 hover:text-gray-900">
                        <X size={28} strokeWidth={2.5} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.3em] font-black text-gray-900 px-1 flex items-center gap-2">
                                <Tag size={14} />
                                Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-3xl px-8 py-5 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all font-bold text-base text-gray-900"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.3em] font-black text-gray-900 px-1 flex items-center gap-2">
                                <IndianRupee size={14} />
                                Price (INR)
                            </label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="e.g., 2500"
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-3xl px-8 py-5 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all text-base font-semibold text-gray-900"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.3em] font-black text-gray-900 px-1 flex items-center gap-2">
                                <Upload size={14} />
                                Upload Photo
                            </label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className={cn(
                                    "w-full rounded-3xl px-8 py-5 font-black uppercase text-xs tracking-widest hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3",
                                    selectedFile ? "bg-emerald-600 text-white" : "bg-gradient-to-r from-teal-600 to-teal-700 text-white"
                                )}
                            >
                                {isUploading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Uploading...
                                    </>
                                ) : selectedFile ? (
                                    <>
                                        <CheckCircle2 size={16} />
                                        {selectedFile.name.slice(0, 12)}...
                                    </>
                                ) : (
                                    <>
                                        <Upload size={16} />
                                        Choose File
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs uppercase tracking-[0.3em] font-black text-gray-900 px-1">Or Enter Image URL</label>
                        <input
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            className="w-full bg-gray-50 border-2 border-gray-200 rounded-3xl px-8 py-5 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all text-base font-medium text-gray-900"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.3em] font-black text-gray-900 px-1">Title (English)</label>
                            <input
                                required
                                value={formData.title_en}
                                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-3xl px-8 py-5 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all text-base font-semibold text-gray-900"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.3em] font-black text-gray-900 px-1">தலைப்பு (தமிழ்)</label>
                            <input
                                required
                                value={formData.title_ta}
                                onChange={(e) => setFormData({ ...formData, title_ta: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-3xl px-8 py-5 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all text-base font-semibold text-gray-900"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.3em] font-black text-gray-900 px-1">Description (English)</label>
                            <textarea
                                value={formData.description_en}
                                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-[2rem] px-8 py-6 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all min-h-[140px] text-base font-medium resize-none text-gray-900"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.3em] font-black text-gray-900 px-1">விவரம் (தமிழ்)</label>
                            <textarea
                                value={formData.description_ta}
                                onChange={(e) => setFormData({ ...formData, description_ta: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-[2rem] px-8 py-6 outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all min-h-[140px] text-base font-medium resize-none text-gray-900"
                            />
                        </div>
                    </div>

                    <div className="border-t-2 border-gray-200 pt-10">
                        <h3 className="text-sm uppercase tracking-widest font-black text-gray-900 mb-6">Custom Fields (Optional)</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <input
                                    value={formData.customField1_label}
                                    onChange={(e) => setFormData({ ...formData, customField1_label: e.target.value })}
                                    placeholder="Field 1 Label (e.g., Fabric Type)"
                                    className="w-full bg-amber-50 border-2 border-amber-200 rounded-3xl px-8 py-4 outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 transition-all text-sm font-bold text-gray-900"
                                />
                                <input
                                    value={formData.customField1_value}
                                    onChange={(e) => setFormData({ ...formData, customField1_value: e.target.value })}
                                    placeholder="Field 1 Value (e.g., Pure Silk)"
                                    className="w-full bg-amber-50 border-2 border-amber-200 rounded-3xl px-8 py-4 outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 transition-all text-sm font-medium text-gray-900"
                                />
                            </div>
                            <div className="space-y-4">
                                <input
                                    value={formData.customField2_label}
                                    onChange={(e) => setFormData({ ...formData, customField2_label: e.target.value })}
                                    placeholder="Field 2 Label (e.g., Stitching Time)"
                                    className="w-full bg-amber-50 border-2 border-amber-200 rounded-3xl px-8 py-4 outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 transition-all text-sm font-bold text-gray-900"
                                />
                                <input
                                    value={formData.customField2_value}
                                    onChange={(e) => setFormData({ ...formData, customField2_value: e.target.value })}
                                    placeholder="Field 2 Value (e.g., 3-5 Days)"
                                    className="w-full bg-amber-50 border-2 border-amber-200 rounded-3xl px-8 py-4 outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 transition-all text-sm font-medium text-gray-900"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-8 pt-8">
                        <button type="button" onClick={onClose} className="text-sm uppercase tracking-[0.3em] font-black text-gray-600 hover:text-red-600 transition-colors">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-12 py-5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-3xl font-black uppercase text-sm tracking-widest hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Adding...</span>
                                </div>
                            ) : "Add to Archive"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}