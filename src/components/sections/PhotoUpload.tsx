'use client';

import { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { uploadPhotos } from '@/lib/api';

interface FileWithPreview {
  file: File;
  preview: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

export default function PhotoUpload() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: uploadPhotos,
    onSuccess: () => {
      alert('사진이 업로드되었습니다!');
      setFiles([]);
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || '사진 업로드에 실패했습니다.');
    },
  });

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const validFiles: FileWithPreview[] = [];

    Array.from(selectedFiles).forEach((file) => {
      // 파일 타입 검증
      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        alert(`${file.name}은(는) 지원하지 않는 파일 형식입니다.`);
        return;
      }

      // 파일 크기 검증 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name}의 크기가 너무 큽니다. (최대 5MB)`);
        return;
      }

      // 미리보기 URL 생성
      const preview = URL.createObjectURL(file);
      validFiles.push({
        file,
        preview,
        progress: 0,
        status: 'pending',
      });
    });

    setFiles((prev) => [...prev, ...validFiles].slice(0, 10)); // 최대 10개
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleUpload = () => {
    if (files.length === 0) {
      alert('업로드할 사진을 선택해주세요.');
      return;
    }

    mutation.mutate(files.map((f) => f.file));
  };

  return (
    <section className="section-padding container-width bg-secondary">
      <h2 className="text-2xl sm:text-3xl font-light text-center mb-8 text-gray-800">
        사진 공유
      </h2>

      <p className="text-center text-gray-600 mb-6 text-sm">
        결혼식 현장에서 찍은 사진을 공유해주세요!
      </p>

      {/* 파일 선택/드래그 앤 드롭 영역 */}
      <Card
        className="border-2 border-dashed border-gray-300 hover:border-primary transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="p-12 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-2">클릭하거나 파일을 드래그하여 업로드</p>
          <p className="text-xs text-gray-500">JPG, PNG, WEBP (최대 5MB, 10개)</p>
        </div>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* 선택된 파일 목록 */}
      {files.length > 0 && (
        <div className="mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {files.map((file, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={file.preview}
                  alt={`미리보기 ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                  disabled={mutation.isPending}
                >
                  <X className="w-4 h-4" />
                </button>
                {file.status === 'success' && (
                  <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center rounded-lg">
                    <span className="text-white font-bold">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Button
            onClick={handleUpload}
            className="w-full"
            disabled={mutation.isPending || files.length === 0}
          >
            {mutation.isPending ? '업로드 중...' : `사진 업로드 (${files.length}개)`}
          </Button>
        </div>
      )}

      {files.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">
          <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          선택된 사진이 없습니다
        </div>
      )}
    </section>
  );
}
