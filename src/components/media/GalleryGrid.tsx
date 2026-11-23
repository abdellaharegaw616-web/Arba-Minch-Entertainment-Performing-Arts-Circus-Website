"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryPhoto {
  src: string;
  title: string;
  caption: string;
  category: string;
}

export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const prevPhoto = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    }
  };

  const nextPhoto = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((item, index) => (
          <div
            key={index}
            onClick={() => openLightbox(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View enlarged photo: ${item.title}`}
            className="group relative rounded-xl overflow-hidden bg-[#17251F] border border-[#D6A84F]/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C64B24]"
          >
            <div className="relative h-64 w-full">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-[#0E1814]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-[#17251F]/90 text-[#D6A84F] border border-[#D6A84F]/40 shadow-lg">
                  <ZoomIn className="w-5 h-5" />
                </span>
              </div>
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#17251F]/90 text-[10px] text-[#D6A84F] font-semibold border border-[#D6A84F]/30">
                {item.category}
              </div>
            </div>
            <div className="p-4 bg-[#EBE5D6] text-[#17251F] space-y-1">
              <h4 className="font-bold text-sm text-[#17251F]">{item.title}</h4>
              <p className="text-xs text-[#17251F]/70 line-clamp-2">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Accessible Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[selectedIndex].title}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") prevPhoto();
            if (e.key === "ArrowRight") nextPhoto();
          }}
        >
          <div
            className="relative max-w-4xl w-full bg-[#17251F] text-[#F7F3EA] rounded-2xl overflow-hidden border border-[#D6A84F]/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-[#F7F3EA] hover:text-[#D6A84F] focus:outline-none"
              aria-label="Close image viewer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation arrows */}
            <button
              onClick={prevPhoto}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 text-[#F7F3EA] hover:text-[#D6A84F] focus:outline-none"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 text-[#F7F3EA] hover:text-[#D6A84F] focus:outline-none"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="relative h-[450px] sm:h-[550px] w-full bg-[#0E1814]">
              <Image
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Caption bar */}
            <div className="p-5 bg-[#0E1814] border-t border-[#23382F] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-[#D6A84F] uppercase tracking-wider">
                  {photos[selectedIndex].category}
                </span>
                <h3 className="font-bold text-base text-[#F7F3EA]">
                  {photos[selectedIndex].title}
                </h3>
                <p className="text-xs text-[#F7F3EA]/75 mt-0.5">
                  {photos[selectedIndex].caption}
                </p>
              </div>
              <span className="text-xs text-[#D6A84F] font-mono shrink-0">
                {selectedIndex + 1} / {photos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
