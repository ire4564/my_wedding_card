import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { Readable } from 'stream';

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
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });

  return auth;
}

// Google Drive 클라이언트 생성
function getDriveClient() {
  const auth = getAuthClient();
  return google.drive({ version: 'v3', auth });
}

// Drive 폴더 ID 가져오기
function getFolderId() {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!folderId) {
    throw new Error('GOOGLE_DRIVE_FOLDER_ID 환경 변수가 설정되지 않았습니다.');
  }
  return folderId;
}

/**
 * 파일을 Google Drive에 업로드
 */
export async function uploadFileToDrive(file: {
  filename: string;
  mimeType: string;
  buffer: Buffer;
}) {
  try {
    const drive = getDriveClient();
    const folderId = getFolderId();

    // Buffer를 Readable Stream으로 변환
    const stream = Readable.from(file.buffer);

    const response = await drive.files.create({
      requestBody: {
        name: file.filename,
        parents: [folderId],
      },
      media: {
        mimeType: file.mimeType,
        body: stream,
      },
      fields: 'id, name, webViewLink, webContentLink',
    });

    // 파일을 공개로 설정 (선택사항)
    if (response.data.id) {
      await drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
    }

    return {
      success: true,
      fileId: response.data.id || '',
      filename: response.data.name || '',
      webViewLink: response.data.webViewLink || '',
      webContentLink: response.data.webContentLink || '',
    };
  } catch (error) {
    console.error('파일 업로드 실패:', error);
    throw error;
  }
}

/**
 * 여러 파일을 Google Drive에 업로드
 */
export async function uploadMultipleFilesToDrive(
  files: Array<{
    filename: string;
    mimeType: string;
    buffer: Buffer;
  }>
) {
  try {
    const results = await Promise.all(files.map((file) => uploadFileToDrive(file)));

    return {
      success: true,
      files: results,
    };
  } catch (error) {
    console.error('다중 파일 업로드 실패:', error);
    throw error;
  }
}

/**
 * 폴더 내 파일 목록 조회
 */
export async function listFilesInFolder(pageSize = 100) {
  try {
    const drive = getDriveClient();
    const folderId = getFolderId();

    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      pageSize,
      fields: 'files(id, name, mimeType, createdTime, webViewLink, webContentLink)',
      orderBy: 'createdTime desc',
    });

    return {
      success: true,
      files: response.data.files || [],
    };
  } catch (error) {
    console.error('파일 목록 조회 실패:', error);
    throw error;
  }
}

/**
 * 파일 삭제
 */
export async function deleteFileFromDrive(fileId: string) {
  try {
    const drive = getDriveClient();

    await drive.files.delete({
      fileId,
    });

    return { success: true };
  } catch (error) {
    console.error('파일 삭제 실패:', error);
    throw error;
  }
}
