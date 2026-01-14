'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface Photo {
  id: string;
  src: string;
  alt: string;
}

interface SnapPhotosProps {
  photos?: Photo[];
}

export default function SnapPhotos({ photos }: SnapPhotosProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // 기본 사진 (9장)
  const defaultPhotos: Photo[] = Array.from({ length: 9 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `/images/snap-${i + 1}.jpg`,
    alt: `스냅 사진 ${i + 1}`,
  }));

  const displayPhotos = photos || defaultPhotos;

  return (
    <>
      <section className="section-padding container-width bg-white">
        <h2 className="text-2xl sm:text-3xl font-light text-center mb-8 text-gray-800">
          Our Moments
        </h2>

        {/* 3열 그리드 */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {displayPhotos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="relative aspect-square overflow-hidden rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 33vw, 160px"
              />
            </button>
          ))}
        </div>
      </section>

      {/* 라이트박스 모달 */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="닫기"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="relative max-w-4xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>
      )}
    </>
  );
}
