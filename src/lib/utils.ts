import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateWhatsAppLink(phone: string, category: string, title: string, lang: string) {
  const text = lang === "ta"
    ? `வணக்கம், நான் இந்த வடிவமைப்பைப் பற்றி கேட்க விரும்புகிறேன்: ${title} (${category})`
    : `Hi, I'm interested in this design: ${title} (${category})`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
