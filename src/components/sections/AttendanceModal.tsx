'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { submitAttendance } from '@/lib/api';
import type { AttendanceFormData } from '@/types/attendance';

export default function AttendanceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<AttendanceFormData>({
    defaultValues: {
      name: '',
      attendance: 'yes',
      count: 1,
    },
  });

  const attendance = watch('attendance');

  // 참석 여부 제출 mutation
  const mutation = useMutation({
    mutationFn: submitAttendance,
    onSuccess: () => {
      alert('참석 여부가 등록되었습니다. 감사합니다!');
      setIsOpen(false);
      reset();
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || '참석 여부 등록에 실패했습니다.');
    },
  });

  const onSubmit = (data: AttendanceFormData) => {
    mutation.mutate(data);
  };

  // 스크롤 이벤트 감지
  useEffect(() => {
    if (hasShown) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // LocationGuide 섹션에 도달했을 때 (대략 3번째 섹션)
      if (scrollY > windowHeight * 2) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShown]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">참석 여부 확인</DialogTitle>
          <DialogDescription className="text-center">
            참석 여부를 알려주시면 준비에 큰 도움이 됩니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* 이름 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              이름 <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              {...register('name', { required: '이름을 입력해주세요.' })}
              placeholder="홍길동"
              disabled={mutation.isPending}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* 참석 여부 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              참석 여부 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <label className="flex-1">
                <input
                  type="radio"
                  value="yes"
                  {...register('attendance')}
                  className="sr-only peer"
                  disabled={mutation.isPending}
                />
                <div className="border-2 border-gray-200 rounded-lg p-3 text-center cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-colors">
                  참석
                </div>
              </label>
              <label className="flex-1">
                <input
                  type="radio"
                  value="no"
                  {...register('attendance')}
                  className="sr-only peer"
                  disabled={mutation.isPending}
                />
                <div className="border-2 border-gray-200 rounded-lg p-3 text-center cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-colors">
                  불참
                </div>
              </label>
            </div>
          </div>

          {/* 참석 인원 (참석할 경우만) */}
          {attendance === 'yes' && (
            <div>
              <label htmlFor="count" className="block text-sm font-medium mb-2">
                참석 인원
              </label>
              <select
                id="count"
                {...register('count', { valueAsNumber: true })}
                className="w-full border border-gray-200 rounded-lg p-3"
                disabled={mutation.isPending}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}명
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 버튼 */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
              disabled={mutation.isPending}
            >
              나중에
            </Button>
            <Button type="submit" className="flex-1" disabled={mutation.isPending}>
              {mutation.isPending ? '등록 중...' : '제출하기'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
