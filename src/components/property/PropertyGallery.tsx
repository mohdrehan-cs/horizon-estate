"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  function show(next: number) {
    setIndex((next + images.length) % images.length);
  }

  return (
    <>
      <div className="grid gap-2 overflow-hidden rounded-3xl sm:grid-cols-[1.6fr_0.8fr]">
        <button
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
          className="group relative aspect-[16/10] overflow-hidden bg-sand sm:aspect-auto sm:min-h-[420px]"
          aria-label="Open photo gallery"
        >
          <Image
            src={images[0]}
            alt={`${title} — main photo`}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 65vw"
            className="object-cover transition duration-700 group-hover:scale-[1.02]"
          />
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-forest-dark/75 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
            <Expand className="size-3.5" /> {images.length} photos
          </span>
        </button>
        <div className="hidden grid-rows-2 gap-2 sm:grid">
          {images.slice(1, 3).map((image, imageIndex) => (
            <button
              key={`${image}-${imageIndex}`}
              onClick={() => {
                setIndex(imageIndex + 1);
                setOpen(true);
              }}
              className="group relative overflow-hidden bg-sand"
              aria-label={`Open photo ${imageIndex + 2}`}
            >
              <Image
                src={image}
                alt={`${title} — photo ${imageIndex + 2}`}
                fill
                sizes="35vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              {imageIndex === 1 ? (
                <span className="absolute inset-0 grid place-items-center bg-forest-dark/45 text-xs font-bold text-white backdrop-blur-[1px]">
                  View all {images.length} photos
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} className="max-w-5xl p-3 sm:p-4">
        <div className="relative">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-sand">
            <Image
              src={images[index]}
              alt={`${title} — photo ${index + 1}`}
              fill
              sizes="90vw"
              className="object-cover"
            />
          </div>
          <button
            onClick={() => show(index - 1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-forest shadow-md backdrop-blur transition hover:bg-white"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => show(index + 1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-forest shadow-md backdrop-blur transition hover:bg-white"
          >
            <ChevronRight className="size-5" />
          </button>
          <p className="absolute bottom-3 left-3 rounded-full bg-forest-dark/70 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur">
            {index + 1} / {images.length}
          </p>
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, imageIndex) => (
            <button
              key={`${image}-thumb`}
              onClick={() => setIndex(imageIndex)}
              className={cn(
                "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition",
                imageIndex === index ? "border-brass" : "border-transparent opacity-60 hover:opacity-100",
              )}
              aria-label={`Show photo ${imageIndex + 1}`}
            >
              <Image src={image} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
