import { NextRequest, NextResponse } from 'next/server';
import { uploadMultipleFilesToDrive } from '@/lib/googleDrive';

// 최대 파일 크기 (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// 허용된 MIME 타입
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

/**
 * POST /api/upload
 * 사진 업로드
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: '파일을 선택해주세요.' }, { status: 400 });
    }

    // 파일 개수 제한 (최대 10개)
    if (files.length > 10) {
      return NextResponse.json(
        { success: false, message: '최대 10개의 파일만 업로드할 수 있습니다.' },
        { status: 400 }
      );
    }

    // 각 파일 검증
    for (const file of files) {
      // 파일 크기 검증
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            message: `${file.name}의 크기가 너무 큽니다. (최대 5MB)`,
          },
          { status: 400 }
        );
      }

      // MIME 타입 검증
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          {
            success: false,
            message: `${file.name}은(는) 지원하지 않는 파일 형식입니다. (JPG, PNG, WEBP만 가능)`,
          },
          { status: 400 }
        );
      }
    }

    // 파일을 Buffer로 변환
    const fileBuffers = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        return {
          filename: file.name,
          mimeType: file.type,
          buffer: Buffer.from(arrayBuffer),
        };
      })
    );

    // Google Drive에 업로드
    const result = await uploadMultipleFilesToDrive(fileBuffers);

    return NextResponse.json({
      success: true,
      message: '사진이 업로드되었습니다.',
      urls: result.files.map((f) => f.webViewLink),
    });
  } catch (error) {
    console.error('파일 업로드 실패:', error);

    return NextResponse.json(
      {
        success: false,
        message: '파일 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.',
        urls: [],
      },
      { status: 500 }
    );
  }
}

// Next.js API Route에서 파일 업로드를 위한 설정
export const config = {
  api: {
    bodyParser: false,
  },
};
