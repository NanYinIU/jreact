import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { getFakeCaptcha } from '@/services/api';
import { userLogin } from '@/services/login'
import { setAuthority ,setHeader} from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      // 定义login方法 可以使用 dispactch{type:login/login}来访问这个数据方法
      const response = yield call(userLogin, payload);
      // call service 方法 yield call 用于调用异步逻辑，yeild put用于出发action 也即是会所call 用来调用接口，put用来调用action改变状态
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      console.log(response.status)
      // Login successfully
      if (response.success === true) {
        // 如果登陆成功之后应该 调用接口将权限和人员基本信息放到localStorge中
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.role);
      setHeader(payload.Authorization)
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
