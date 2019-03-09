import request from '@/utils/request';
import { getHeader } from '@/utils/authority';
import { stringify } from 'querystring';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request(`/api/user/currentUser?${stringify({username:"admin"})}`)
}
