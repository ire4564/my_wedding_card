import { NextRequest, NextResponse } from 'next/server';
import { getGuestbookMessages, addGuestbookMessage, deleteGuestbookMessage } from '@/lib/googleSheets';
import type {
  GuestbookListResponse,
  GuestbookCreateRequest,
  GuestbookCreateResponse,
  GuestbookDeleteRequest,
  GuestbookDeleteResponse,
} from '@/types/guestbook';

/**
 * GET /api/guestbook
 * 방명록 목록 조회
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const side = searchParams.get('side') as 'bride' | 'groom' | null;
    const limit = Number(searchParams.get('limit')) || 50;
    const offset = Number(searchParams.get('offset')) || 0;

    if (!side || !['bride', 'groom'].includes(side)) {
      return NextResponse.json(
        { success: false, message: 'side 파라미터는 bride 또는 groom이어야 합니다.' },
        { status: 400 }
      );
    }

    const result = await getGuestbookMessages(side, limit, offset);

    const response: GuestbookListResponse = {
      success: true,
      messages: result.messages,
      total: result.total,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('방명록 조회 실패:', error);

    return NextResponse.json(
      {
        success: false,
        messages: [],
        total: 0,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/guestbook
 * 방명록 작성
 */
export async function POST(request: NextRequest) {
  try {
    const body: GuestbookCreateRequest = await request.json();

    // 입력값 검증
    if (!body.side || !['bride', 'groom'].includes(body.side)) {
      return NextResponse.json(
        { success: false, message: 'side는 bride 또는 groom이어야 합니다.' },
        { status: 400 }
      );
    }

    if (!body.author || !body.author.trim()) {
      return NextResponse.json({ success: false, message: '작성자를 입력해주세요.' }, { status: 400 });
    }

    if (!body.message || !body.message.trim()) {
      return NextResponse.json({ success: false, message: '메시지를 입력해주세요.' }, { status: 400 });
    }

    if (body.message.trim().length > 500) {
      return NextResponse.json(
        { success: false, message: '메시지는 500자 이내로 작성해주세요.' },
        { status: 400 }
      );
    }

    // Google Sheets에 기록
    const result = await addGuestbookMessage({
      side: body.side,
      author: body.author.trim(),
      message: body.message.trim(),
      password: body.password,
    });

    const response: GuestbookCreateResponse = {
      success: true,
      id: result.id,
      message: '방명록이 작성되었습니다.',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('방명록 작성 실패:', error);

    return NextResponse.json(
      {
        success: false,
        id: '',
        message: '방명록 작성에 실패했습니다. 잠시 후 다시 시도해주세요.',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/guestbook
 * 방명록 삭제
 */
export async function DELETE(request: NextRequest) {
  try {
    const body: GuestbookDeleteRequest = await request.json();

    if (!body.id || !body.password) {
      return NextResponse.json(
        { success: false, message: 'ID와 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    await deleteGuestbookMessage(body.id, body.password);

    const response: GuestbookDeleteResponse = {
      success: true,
      message: '방명록이 삭제되었습니다.',
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('방명록 삭제 실패:', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || '방명록 삭제에 실패했습니다.',
      },
      { status: 500 }
    );
  }
}
