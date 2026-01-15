import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Service Account 인증 설정
function getAuthClient() {
  const serviceAccount = process.env.GOOGLE_SERVICE_ACCOUNT;

  if (!serviceAccount) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT 환경 변수가 설정되지 않았습니다.');
  }

  const credentials = JSON.parse(serviceAccount);

  const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return auth;
}

// Google Sheets 클라이언트 생성
function getSheetsClient() {
  const auth = getAuthClient();
  return google.sheets({ version: 'v4', auth });
}

// Sheets ID 가져오기
function getSheetId() {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  if (!sheetId) {
    throw new Error('GOOGLE_SHEETS_ID 환경 변수가 설정되지 않았습니다.');
  }
  return sheetId;
}

/**
 * 참석 여부 데이터 추가
 */
export async function addAttendanceRecord(data: {
  name: string;
  attendance: 'yes' | 'no';
  count: number;
}) {
  try {
    const sheets = getSheetsClient();
    const spreadsheetId = getSheetId();

    const timestamp = new Date().toISOString();
    const values = [[timestamp, data.name, data.attendance, data.count]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Attendance!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('참석 여부 기록 실패:', error);
    throw error;
  }
}

/**
 * 방명록 데이터 조회
 */
export async function getGuestbookMessages(side: 'bride' | 'groom', limit = 50, offset = 0) {
  try {
    const sheets = getSheetsClient();
    const spreadsheetId = getSheetId();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Guestbook!A:F',
    });

    const rows = response.data.values || [];

    // 헤더 제외하고 필터링
    const messages = rows
      .slice(1) // 헤더 제외
      .filter((row) => row[1] === side) // side 필터
      .map((row, index) => ({
        id: `${side}-${index}`,
        timestamp: row[0] || '',
        side: row[1] as 'bride' | 'groom',
        author: row[2] || '',
        message: row[3] || '',
        password: row[4] || '',
        createdAt: row[0] || '',
        updatedAt: row[5] || row[0] || '',
      }))
      .slice(offset, offset + limit);

    return {
      success: true,
      messages,
      total: rows.length - 1,
    };
  } catch (error) {
    console.error('방명록 조회 실패:', error);
    throw error;
  }
}

/**
 * 방명록 데이터 추가
 */
export async function addGuestbookMessage(data: {
  side: 'bride' | 'groom';
  author: string;
  message: string;
  password?: string;
}) {
  try {
    const sheets = getSheetsClient();
    const spreadsheetId = getSheetId();

    const timestamp = new Date().toISOString();
    const values = [[timestamp, data.side, data.author, data.message, data.password || '', timestamp]];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Guestbook!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    const updatedRange = response.data.updates?.updatedRange || '';
    const rowNumber = updatedRange.match(/\d+$/)?.[0] || '0';

    return {
      success: true,
      id: `${data.side}-${rowNumber}`,
    };
  } catch (error) {
    console.error('방명록 작성 실패:', error);
    throw error;
  }
}

/**
 * 방명록 데이터 삭제 (비밀번호 확인)
 */
export async function deleteGuestbookMessage(id: string, password: string) {
  try {
    const sheets = getSheetsClient();
    const spreadsheetId = getSheetId();

    // 먼저 해당 행 찾기
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Guestbook!A:F',
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex((row, index) => {
      if (index === 0) return false; // 헤더 제외
      const rowId = `${row[1]}-${index}`;
      return rowId === id && row[4] === password;
    });

    if (rowIndex === -1) {
      throw new Error('비밀번호가 일치하지 않거나 메시지를 찾을 수 없습니다.');
    }

    // 행 삭제
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0,
                dimension: 'ROWS',
                startIndex: rowIndex,
                endIndex: rowIndex + 1,
              },
            },
          },
        ],
      },
    });

    return { success: true };
  } catch (error) {
    console.error('방명록 삭제 실패:', error);
    throw error;
  }
}
