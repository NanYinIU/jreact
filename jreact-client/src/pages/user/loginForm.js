import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import styles from '../../assets/components/login/login.css'
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import {asyncValidate,validate,/*submit*/} from './fieldValidate'
import {userActions} from '../../actions/user.action'
const RenderField = ({ input, label, type, meta: { asyncValidating,touched, error, warning } }) => (
  <div>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="{input.id}">{label}</InputLabel>
        <Input  {...input} placeholder={label} type={type} />
        {touched && ((error && <FormHelperText error={true} >{error}</FormHelperText> ))}
      </FormControl>
  </div>
)

class LoginForm extends Component {

  constructor(props){
        super(props);
        this.state={
        }
    }
  submit=(values)=> {
    return this.props.dispatch(userActions.login(values.username,values.password))
  }
  render() {
    const {classes,handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit)} className={classes.form} >
      <FormControl margin="normal" fullWidth>
          <Field name="username"  label="用户名" component={RenderField} type="text"/>
      </FormControl>

      <FormControl margin="normal" fullWidth>
          <Field name="password" label="密码" component={RenderField} type="password"/>
      </FormControl>
      <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="记住密码"
      />
      <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          // disabled={true}
      >
          登  录
      </Button>
    </form>
    );
  }
}

// Decorate the form component
LoginForm = reduxForm({
  form: 'login', // a unique name for this form
  validate,
  asyncValidate,
  asyncBlurFields: [ 'username' ]
})(LoginForm);

export default withStyles(styles)(LoginForm);
