import React, { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { ListItem, Input } from 'react-native-elements';

import { CustomHeaderButton, Toast } from '../../Public/components';

import { actionEditDisplayName } from '../../Public/redux/action';

const EditNameSchema = yup.object().shape({
  displayName: yup.string()
});

const EditName = props => {
  const { auth, users, editDisplayName, navigation } = props;
  const [actionLoading, setActionLoading] = useState(false);
  const { register, handleSubmit, setValue, errors, getValues } = useForm({
    defaultValues: {
      displayName: users.displayName
    },
    validationSchema: EditNameSchema
  });

  navigation.setOptions({
    title: 'Display Name',
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
    const { displayName } = getValues();
    try {
      await editDisplayName({
        userId: auth.uid,
        userDisplayName: displayName
      }).then(() => {
        setActionLoading(false);
        Toast('Name has been updated.');
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
            ref={register({ name: 'displayName' })}
            defaultValue={users.displayName}
            placeholder="Display Name"
            errorMessage={errors.displayName ? errors.displayName.message : ''}
            onChangeText={handleChange('displayName')}
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
  editDisplayName: payload => dispatch(actionEditDisplayName(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditName);
