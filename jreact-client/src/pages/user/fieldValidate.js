import axios from 'axios'
import { SubmissionError } from 'redux-form'
import history from '../../history'
import { userActions } from "../../actions/user.action";

export const asyncValidate = (values/*, dispatch */) => {
    return axios({
        method: 'get',
        url: '/user/validateUsername',
        params: {
          username: values.username,
        }
      }).then(function(response){
          if(response.data.success === false){
            throw {username: '没有该用户名！'}
          }
      });
}


export const validate = values =>{
    const errors = {}
    if (!values.username) {
      errors.username = '此项必输'
    } else if (values.username.length > 15) {
      errors.username = '用户名必须小于15个字符'
    }
    if (!values.password) {
      errors.password = '此项必输'
    }
    return errors;
  }


