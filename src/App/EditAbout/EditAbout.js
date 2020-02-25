import React, { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { ListItem, Input } from 'react-native-elements';

import { CustomHeaderButton } from '../../Public/components';

import { actionEditAbout } from '../../Public/redux/action';

const EditAboutSchema = yup.object().shape({
  about: yup.string()
});

const EditAbout = props => {
  const { auth, users, editAbout, navigation } = props;
  const [actionLoading, setActionLoading] = useState(false);
  const { register, handleSubmit, setValue, errors, getValues } = useForm({
    defaultValues: {
      about: users.about
    },
    validationSchema: EditAboutSchema
  });

  navigation.setOptions({
    title: 'Bio',
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
    const { about } = getValues();
    try {
      await editAbout({
        userId: auth.uid,
        userAbout: about
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
            ref={register({ name: 'about' })}
            defaultValue={users.about}
            placeholder="Bio"
            errorMessage={errors.about ? errors.about.message : ''}
            onChangeText={handleChange('about')}
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
  editAbout: payload => dispatch(actionEditAbout(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAbout);
