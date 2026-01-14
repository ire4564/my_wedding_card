'use client';

import { Phone, Mail } from 'lucide-react';

interface FooterProps {
  groomName: string;
  brideName: string;
  groomPhone?: string;
  bridePhone?: string;
  groomEmail?: string;
  brideEmail?: string;
  venuePhone?: string;
}

export default function Footer({
  groomName,
  brideName,
  groomPhone,
  bridePhone,
  groomEmail,
  brideEmail,
  venuePhone,
}: FooterProps) {
  const makeCall = (phone: string) => {
    window.location.href = `tel:${phone.replace(/-/g, '')}`;
  };

  const sendEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <footer className="section-padding container-width bg-white border-t border-gray-200">
      {/* 신랑신부 연락처 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        {/* 신랑 */}
        {(groomPhone || groomEmail) && (
          <div className="text-center">
            <h3 className="text-lg font-medium mb-4 text-gray-800">신랑 {groomName}</h3>
            <div className="space-y-2">
              {groomPhone && (
                <button
                  onClick={() => makeCall(groomPhone)}
                  className="flex items-center justify-center gap-2 w-full p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-700">{groomPhone}</span>
                </button>
              )}
              {groomEmail && (
                <button
                  onClick={() => sendEmail(groomEmail)}
                  className="flex items-center justify-center gap-2 w-full p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-700">{groomEmail}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* 신부 */}
        {(bridePhone || brideEmail) && (
          <div className="text-center">
            <h3 className="text-lg font-medium mb-4 text-gray-800">신부 {brideName}</h3>
            <div className="space-y-2">
              {bridePhone && (
                <button
                  onClick={() => makeCall(bridePhone)}
                  className="flex items-center justify-center gap-2 w-full p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-700">{bridePhone}</span>
                </button>
              )}
              {brideEmail && (
                <button
                  onClick={() => sendEmail(brideEmail)}
                  className="flex items-center justify-center gap-2 w-full p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-700">{brideEmail}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 예식장 연락처 */}
      {venuePhone && (
        <div className="text-center border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium mb-2 text-gray-600">예식장 문의</h3>
          <button
            onClick={() => makeCall(venuePhone)}
            className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            {venuePhone}
          </button>
        </div>
      )}

      {/* Copyright */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          {groomName} & {brideName}의 결혼식
        </p>
        <p className="text-xs text-gray-400 mt-1">
          © 2026 All rights reserved
        </p>
      </div>
    </footer>
  );
}
