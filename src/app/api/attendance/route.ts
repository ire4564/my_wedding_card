import { NextRequest, NextResponse } from 'next/server';
import { addAttendanceRecord } from '@/lib/googleSheets';
import type { AttendanceSubmitRequest, AttendanceSubmitResponse } from '@/types/attendance';

export async function POST(request: NextRequest) {
  try {
    const body: AttendanceSubmitRequest = await request.json();

    // 입력값 검증
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, message: '이름을 입력해주세요.' },
        { status: 400 }
      );
    }

    if (!body.attendance || !['yes', 'no'].includes(body.attendance)) {
      return NextResponse.json(
        { success: false, message: '참석 여부를 선택해주세요.' },
        { status: 400 }
      );
    }

    if (body.attendance === 'yes' && (!body.count || body.count < 1 || body.count > 5)) {
      return NextResponse.json(
        { success: false, message: '참석 인원은 1명에서 5명 사이여야 합니다.' },
        { status: 400 }
      );
    }

    // Google Sheets에 기록
    await addAttendanceRecord({
      name: body.name.trim(),
      attendance: body.attendance,
      count: body.attendance === 'yes' ? body.count : 0,
    });

    const response: AttendanceSubmitResponse = {
      success: true,
      message: '참석 여부가 등록되었습니다. 감사합니다!',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('참석 여부 등록 실패:', error);

    return NextResponse.json(
      {
        success: false,
        message: '참석 여부 등록에 실패했습니다. 잠시 후 다시 시도해주세요.',
      },
      { status: 500 }
    );
  }
}
