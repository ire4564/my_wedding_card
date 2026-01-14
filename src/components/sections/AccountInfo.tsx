'use client';

import { useState } from 'react';
import { Copy, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AccountData {
  bank: string;
  owner: string;
  accountNumber: string;
}

interface AccountInfoProps {
  groomAccount: string; // "은행명|예금주|계좌번호"
  brideAccount: string;
}

export default function AccountInfo({ groomAccount, brideAccount }: AccountInfoProps) {
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);

  // 계좌 정보 파싱
  const parseAccount = (accountStr: string): AccountData => {
    const [bank, owner, accountNumber] = accountStr.split('|');
    return { bank, owner, accountNumber };
  };

  const groom = parseAccount(groomAccount);
  const bride = parseAccount(brideAccount);

  // 계좌번호 복사
  const copyAccountNumber = async (accountNumber: string, side: 'groom' | 'bride') => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      if (side === 'groom') {
        setCopiedGroom(true);
        setTimeout(() => setCopiedGroom(false), 2000);
      } else {
        setCopiedBride(true);
        setTimeout(() => setCopiedBride(false), 2000);
      }
    } catch (error) {
      console.error('계좌번호 복사 실패:', error);
    }
  };

  // 모바일 여부 확인
  const isMobile = () => {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  // 카카오페이 송금 (모바일만)
  const openKakaoPay = () => {
    if (!isMobile()) {
      alert('카카오페이는 모바일 기기에서만 사용 가능합니다.');
      return;
    }
    // 실제 카카오페이 링크는 Phase 5에서 구현
    alert('카카오페이 송금 기능은 추후 구현 예정입니다.');
  };

  // 토스 송금 (모바일만)
  const openToss = () => {
    if (!isMobile()) {
      alert('토스는 모바일 기기에서만 사용 가능합니다.');
      return;
    }
    // 실제 토스 링크는 Phase 5에서 구현
    alert('토스 송금 기능은 추후 구현 예정입니다.');
  };

  return (
    <section className="section-padding container-width bg-secondary">
      <h2 className="text-2xl sm:text-3xl font-light text-center mb-8 text-gray-800">
        마음 전하실 곳
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* 신랑측 계좌 */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4 text-center text-gray-800">
            신랑측 계좌
          </h3>

          <div className="space-y-3 mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">{groom.bank}</p>
              <p className="text-base font-medium text-gray-800">{groom.owner}</p>
              <p className="text-sm text-gray-700 font-mono mt-1">{groom.accountNumber}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={() => copyAccountNumber(groom.accountNumber, 'groom')}
              variant="outline"
              className="w-full gap-2"
            >
              <Copy className="w-4 h-4" />
              {copiedGroom ? '복사 완료!' : '계좌번호 복사'}
            </Button>
          </div>
        </Card>

        {/* 신부측 계좌 */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4 text-center text-gray-800">
            신부측 계좌
          </h3>

          <div className="space-y-3 mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">{bride.bank}</p>
              <p className="text-base font-medium text-gray-800">{bride.owner}</p>
              <p className="text-sm text-gray-700 font-mono mt-1">{bride.accountNumber}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={() => copyAccountNumber(bride.accountNumber, 'bride')}
              variant="outline"
              className="w-full gap-2"
            >
              <Copy className="w-4 h-4" />
              {copiedBride ? '복사 완료!' : '계좌번호 복사'}
            </Button>
          </div>
        </Card>
      </div>

      {/* 간편 송금 버튼 (모바일만) */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Button
          onClick={openKakaoPay}
          variant="default"
          className="flex-1 gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900"
        >
          <Smartphone className="w-4 h-4" />
          카카오페이 송금
        </Button>

        <Button
          onClick={openToss}
          variant="default"
          className="flex-1 gap-2 bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Smartphone className="w-4 h-4" />
          토스 송금
        </Button>
      </div>
    </section>
  );
}
