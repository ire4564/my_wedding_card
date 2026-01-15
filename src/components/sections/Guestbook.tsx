'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getGuestbookMessages, createGuestbookMessage } from '@/lib/api';
import type { GuestbookFormData, Side } from '@/types';

export default function Guestbook() {
  const [activeSide, setActiveSide] = useState<Side>('groom');
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GuestbookFormData>({
    defaultValues: {
      side: 'groom',
      author: '',
      message: '',
      password: '',
    },
  });

  // 방명록 조회
  const { data, isLoading } = useQuery({
    queryKey: ['guestbook', activeSide],
    queryFn: () => getGuestbookMessages(activeSide),
  });

  // 방명록 작성
  const mutation = useMutation({
    mutationFn: createGuestbookMessage,
    onSuccess: () => {
      alert('방명록이 작성되었습니다.');
      reset();
      queryClient.invalidateQueries({ queryKey: ['guestbook', activeSide] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || '방명록 작성에 실패했습니다.');
    },
  });

  const onSubmit = (data: GuestbookFormData) => {
    mutation.mutate({ ...data, side: activeSide });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section className="section-padding container-width bg-white">
      <h2 className="text-2xl sm:text-3xl font-light text-center mb-8 text-gray-800">
        축하 메시지
      </h2>

      <Tabs value={activeSide} onValueChange={(value) => setActiveSide(value as Side)}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="groom">신랑측</TabsTrigger>
          <TabsTrigger value="bride">신부측</TabsTrigger>
        </TabsList>

        {/* 방명록 작성 폼 */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    {...register('author', { required: '작성자를 입력해주세요.' })}
                    placeholder="작성자"
                    disabled={mutation.isPending}
                  />
                  {errors.author && (
                    <p className="text-red-500 text-xs mt-1">{errors.author.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="password"
                    {...register('password')}
                    placeholder="비밀번호 (선택)"
                    disabled={mutation.isPending}
                  />
                </div>
              </div>

              <div>
                <textarea
                  {...register('message', {
                    required: '메시지를 입력해주세요.',
                    maxLength: {
                      value: 500,
                      message: '메시지는 500자 이내로 작성해주세요.',
                    },
                  })}
                  placeholder="축하 메시지를 남겨주세요."
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={mutation.isPending}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={mutation.isPending}>
                {mutation.isPending ? '작성 중...' : '작성하기'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 방명록 목록 */}
        <TabsContent value="groom" className="space-y-4 mt-0">
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">불러오는 중...</div>
          ) : data?.messages && data.messages.length > 0 ? (
            data.messages.map((message) => (
              <Card key={message.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-800">{message.author}</span>
                    <span className="text-xs text-gray-500">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              첫 번째 축하 메시지를 남겨주세요!
            </div>
          )}
        </TabsContent>

        <TabsContent value="bride" className="space-y-4 mt-0">
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">불러오는 중...</div>
          ) : data?.messages && data.messages.length > 0 ? (
            data.messages.map((message) => (
              <Card key={message.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-800">{message.author}</span>
                    <span className="text-xs text-gray-500">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              첫 번째 축하 메시지를 남겨주세요!
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
