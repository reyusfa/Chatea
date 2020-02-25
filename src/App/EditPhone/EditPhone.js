import React, { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { ListItem, Input } from 'react-native-elements';

import { CustomHeaderButton } from '../../Public/components';

import { actionEditPhoneNumber } from '../../Public/redux/action';

const EditPhone = props => {
  const { auth, users, editPhoneNumber, navigation } = props;
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  navigation.setOptions({
    title: 'Phone Number',
    headerRightContainerStyle: {
      width: 50,
      alignItems: 'center',
      marginHorizontal: 3
    },
    headerRight: () => (
      <CustomHeaderButton
        iconType="entypo"
        iconName="check"
        onPress={() => {
          editPhoneNumber({ userId: auth.uid, userPhoneNumber });
          navigation.goBack();
        }}
      />
    )
  });

  const handleChangeText = text => {
    setUserPhoneNumber(text);
  };

  return (
    <View {...{ style: { backgroundColor: '#ffffff', flex: 1 } }}>
      <ListItem
        title={
          <Input
            defaultValue={users.phoneNumber}
            placeholder="Phone Number"
            onChangeText={text => handleChangeText(text)}
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
