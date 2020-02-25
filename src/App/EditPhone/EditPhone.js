import React, { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { ListItem, Input } from 'react-native-elements';

import { CustomHeaderButton } from '../../Public/components';

import { actionEditPhoneNumber } from '../../Public/redux/action';

const EditPhoneSchema = yup.object().shape({
  phoneNumber: yup.number()
});

const EditPhone = props => {
  const { auth, users, editPhoneNumber, navigation } = props;
  const [actionLoading, setActionLoading] = useState(false);
  const { register, handleSubmit, setValue, errors, getValues } = useForm({
    defaultValues: {
      phoneNumber: users.phoneNumber
    },
    validationSchema: EditPhoneSchema
  });

  navigation.setOptions({
    title: 'Phone Number',
    headerRightContainerStyle: {
      width: 50,
      alignItems: 'center',
      marginHorizontal: 3
    },
    headerRight: () =>
      actionLoading ? null : (
        <CustomHeaderButton
          iconType="entypo"
          iconName="check"
          onPress={onSubmit}
        />
      )
  });

  const handleChange = field => {
    return text => setValue(field, text, true);
  };

  const onSubmit = handleSubmit(async () => {
    setActionLoading(true);
    const { phoneNumber } = getValues();
    try {
      await editPhoneNumber({
        userId: auth.uid,
        userPhoneNumber: phoneNumber
      }).then(() => {
        setActionLoading(false);
        navigation.goBack();
      });
    } catch (error) {
      setActionLoading(false);
    }
  });

  return (
    <View {...{ style: { backgroundColor: '#ffffff', flex: 1 } }}>
      <ListItem
        title={
          <Input
            ref={register({ name: 'phoneNumber' })}
            defaultValue={users.phoneNumber}
            placeholder="Phone Number"
            errorMessage={errors.phoneNumber ? errors.phoneNumber.message : ''}
            onChangeText={handleChange('phoneNumber')}
          />
        }
      />
    </View>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  editPhoneNumber: payload => dispatch(actionEditPhoneNumber(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPhone);
