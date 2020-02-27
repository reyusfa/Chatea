import React, { Fragment, useState } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { actionRegisterRequest } from '../../Public/redux/action';

import { color, fontFamily } from '../../Public/components/Styles';
import {
  Button,
  Input,
  ListItem,
  ListItemFooter,
  ContainerScrollView,
  TextInView
} from '../../Public/components';

const defaultValues = {
  displayName: '',
  email: '',
  password: ''
};

const RegisterSchema = yup.object().shape({
  displayName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
  reTypePassword: yup
    .string()
    .required()
    .test('password-match', 'Password does not match.', function(value) {
      return this.parent.password === value;
    })
});

const Register = props => {
  const { registerRequest, navigation } = props;
  const [actionLoading, setActionLoading] = useState(false);
  const { register, handleSubmit, setValue, errors, getValues } = useForm({
    defaultValues,
    validationSchema: RegisterSchema
  });

  const handleChange = field => {
    return text => setValue(field, text, true);
  };

  const onSubmit = handleSubmit(async () => {
    setActionLoading(true);
    const { email, password } = getValues();
    try {
      await registerRequest({ email, password }).then(result => {
        navigation.navigate('Login');
      });
      setActionLoading(false);
    } catch (error) {
      setActionLoading(false);
    }
  });

  return (
    <ContainerScrollView>
      <View
        {...{
          style: {
            paddingTop: 24,
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}>
        <Text
          {...{
            style: { ...fontFamily.Bold, color: color.Foreground, fontSize: 20 }
          }}>
          Create New Account
        </Text>
      </View>
      <ListItem
        title={
          <Fragment>
            <Input
              placeholder="Display Name"
              ref={register({ name: 'displayName' })}
              errorMessage={
                errors.displayName ? errors.displayName.message : ''
              }
              onChangeText={handleChange('displayName')}
              leftIcon={{ name: 'person', type: 'material' }}
            />
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
              secureTextEntry
            />
            <Input
              placeholder="Re-type Password"
              ref={register({ name: 'reTypePassword' })}
              errorMessage={
                errors.reTypePassword ? errors.reTypePassword.message : ''
              }
              onChangeText={handleChange('reTypePassword')}
              leftIcon={{ name: 'lock', type: 'material' }}
              secureTextEntry
            />
            <ListItemFooter>
              <Button
                title="Register"
                onPress={onSubmit}
                loading={actionLoading}
              />
            </ListItemFooter>
            <ListItemFooter>
              <TextInView
                title="Already have an account? Login instead."
                viewProps={{
                  style: {
                    padding: 8
                  }
                }}
                textProps={{
                  onPress: () => navigation.navigate('Login')
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
  registerRequest: payload => dispatch(actionRegisterRequest(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
