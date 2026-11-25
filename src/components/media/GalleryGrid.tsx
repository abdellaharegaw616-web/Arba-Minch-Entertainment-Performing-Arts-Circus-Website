"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Play,
  Film,
  Camera,
  Layers,
  Sparkles,
} from "lucide-react";
import { GalleryAsset } from "@/types";

export interface GalleryItem {
  id?: string;
  assetType?: "image" | "video";
  src?: string;
  mediaUrl?: string;
  title: string;
  caption?: string;
  category: string;
  thumbnailUrl?: string;
}

interface GalleryGridProps {
  photos?: GalleryItem[];
  assets?: GalleryAsset[];
}

// Safely converts YouTube or Vimeo URLs to privacy-friendly embed URLs
function getSafeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // YouTube match
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }

  // Vimeo match
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/i);
  if (vimeoMatch && vimeoMatch[3]) {
    return `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1`;
  }

  return null;
}

export function GalleryGrid({ photos, assets }: GalleryGridProps) {
  // Normalize items
  const allItems: GalleryItem[] = (assets || photos || []).map((item, idx) => ({
    id: item.id || `item-${idx}`,
    assetType: item.assetType || "image",
    title: item.title,
    caption: item.caption || "",
    category: item.category || "Performances",
    mediaUrl: item.mediaUrl || ('src' in item ? (item as any).src : "") || "/images/circus_performance_1.png",
    thumbnailUrl:
      item.thumbnailUrl || ('src' in item ? (item as any).src : "") || item.mediaUrl || "/images/circus_performance_1.png",
  }));

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Available unique categories
  const categories = ["All", ...Array.from(new Set(allItems.map((i) => i.category)))];

  const filteredItems =
    selectedCategory === "All"
      ? allItems
      : allItems.filter((i) => i.category.toLowerCase() === selectedCategory.toLowerCase());

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const prevItem = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const nextItem = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredItems.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevItem();
      if (e.key === "ArrowRight") nextItem();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const activeItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;
  const embedUrl = activeItem && activeItem.assetType === "video" ? getSafeEmbedUrl(activeItem.mediaUrl || "") : null;

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isActive
                  ? "bg-[#C64B24] text-[#F7F3EA] shadow-md scale-105"
                  : "bg-[#EBE5D6] text-[#17251F] hover:bg-[#D6A84F]/30 border border-[#D6A84F]/30"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => {
          const isVideo = item.assetType === "video";
          return (
            <div
              key={item.id || index}
              onClick={() => openLightbox(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${isVideo ? "video" : "enlarged photo"}: ${item.title}`}
              className="group relative rounded-2xl overflow-hidden bg-[#17251F] border border-[#D6A84F]/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C64B24] shadow-md flex flex-col justify-between"
            >
              <div className="relative h-64 w-full bg-[#0E1814] overflow-hidden">
                <Image
                  src={item.thumbnailUrl || "/images/circus_performance_1.png"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#0E1814]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-3 rounded-full bg-[#17251F]/90 text-[#D6A84F] border border-[#D6A84F]/40 shadow-xl scale-95 group-hover:scale-100 transition-transform">
                    {isVideo ? <Play className="w-6 h-6 fill-current" /> : <ZoomIn className="w-6 h-6" />}
                  </span>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded bg-[#17251F]/90 text-[10px] text-[#D6A84F] font-bold border border-[#D6A84F]/30">
                    {item.category}
                  </span>
                  {isVideo && (
                    <span className="px-2 py-0.5 rounded bg-[#C64B24] text-[10px] text-[#F7F3EA] font-extrabold flex items-center gap-1 shadow">
                      <Film className="w-3 h-3" /> Video
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Caption */}
              <div className="p-4 bg-[#EBE5D6] text-[#17251F] space-y-1">
                <h4 className="font-extrabold text-sm text-[#17251F] group-hover:text-[#C64B24] transition-colors">
                  {item.title}
                </h4>
                {item.caption && (
                  <p className="text-xs text-[#17251F]/75 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-[#EBE5D6] border border-[#D6A84F]/30">
          <p className="text-sm font-semibold text-[#17251F]">
            No approved media found in this category.
          </p>
        </div>
      )}

      {/* Accessible Lightbox Modal */}
      {activeItem && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-[#17251F] text-[#F7F3EA] rounded-2xl overflow-hidden border border-[#D6A84F]/40 shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 text-[#F7F3EA] hover:text-[#D6A84F] focus:outline-none focus:ring-2 focus:ring-[#C64B24]"
              aria-label="Close media viewer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation arrows */}
            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={prevItem}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/70 text-[#F7F3EA] hover:text-[#D6A84F] focus:outline-none"
                  aria-label="Previous item"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextItem}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/70 text-[#F7F3EA] hover:text-[#D6A84F] focus:outline-none"
                  aria-label="Next item"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Main Media View */}
            <div className="relative h-[360px] sm:h-[480px] w-full bg-[#0E1814] flex items-center justify-center">
              {activeItem.assetType === "video" ? (
                embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={activeItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="p-8 text-center space-y-3">
                    <Film className="w-12 h-12 text-[#D6A84F] mx-auto" />
                    <p className="text-sm font-semibold text-[#F7F3EA]">
                      Video preview is available via authorized video player.
                    </p>
                    <a
                      href={activeItem.mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 rounded bg-[#C64B24] text-xs font-bold text-[#F7F3EA]"
                    >
                      Watch Video on Provider Site &rarr;
                    </a>
                  </div>
                )
              ) : (
                <Image
                  src={activeItem.mediaUrl || activeItem.thumbnailUrl || "/images/circus_performance_1.png"}
                  alt={activeItem.title}
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>

            {/* Caption & Metadata Bar */}
            <div className="p-5 bg-[#0E1814] border-t border-[#23382F] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] font-bold text-[#D6A84F] uppercase tracking-wider block mb-0.5">
                  {activeItem.category} • {activeItem.assetType === "video" ? "Approved Video Embed" : "Cloudinary / Performance Photo"}
                </span>
                <h3 className="font-extrabold text-base text-[#F7F3EA]">
                  {activeItem.title}
                </h3>
                {activeItem.caption && (
                  <p className="text-xs text-[#F7F3EA]/75 mt-0.5 leading-relaxed">
                    {activeItem.caption}
                  </p>
                )}
              </div>
              <span className="text-xs text-[#D6A84F] font-mono shrink-0">
                {selectedIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
