import request from '@/utils/request';

export async function refreshToken(token: string) {
  return request(`${API}/account/refresh-token`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
}
