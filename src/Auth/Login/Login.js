import React, { Fragment, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { actionLoginRequest } from '../../Public/redux/action';

// import { color } from '../../Public/components/Styles';
import {
  Button,
  Input,
  ListItem,
  ListItemFooter,
  ContainerScrollView,
  TextInView
} from '../../Public/components';

const defaultValues = {
  email: 'flipchest@gmail.com',
  password: 'password'
};

const LoginSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required()
});

const Login = props => {
  const { loginRequest, navigation } = props;
  const [actionLoading, setActionLoading] = useState(false);
  const { register, handleSubmit, setValue, errors, getValues } = useForm({
    defaultValues,
    validationSchema: LoginSchema
  });

  const handleChange = field => {
    return text => setValue(field, text, true);
  };

  const onSubmit = handleSubmit(async () => {
    setActionLoading(true);
    const { email, password } = getValues();
    try {
      await loginRequest({ email, password });
      setActionLoading(false);
    } catch (error) {
      setActionLoading(false);
    }
  });

  return (
    <ContainerScrollView>
      <ListItem
        title={
          <Fragment>
            <Input
              placeholder="Email"
              ref={register({ name: 'email' })}
              errorMessage={errors.email ? errors.email.message : ''}
              onChangeText={handleChange('email')}
              leftIcon={{ name: 'mail', type: 'material' }}
            />
            <Input
              placeholder="Password"
              ref={register({ name: 'password' })}
              errorMessage={errors.password ? errors.password.message : ''}
              onChangeText={handleChange('password')}
              leftIcon={{ name: 'lock', type: 'material' }}
            />
            <ListItemFooter>
              <Button
                title="Login"
                onPress={onSubmit}
                loading={actionLoading}
              />
            </ListItemFooter>
            <ListItemFooter>
              <TextInView
                title="Create new account."
                viewProps={{
                  style: {
                    padding: 8
                  }
                }}
                textProps={{
                  onPress: () => navigation.navigate('Register')
                }}
                textPrimary
              />
            </ListItemFooter>
          </Fragment>
        }
      />
    </ContainerScrollView>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  loginRequest: payload => dispatch(actionLoginRequest(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
