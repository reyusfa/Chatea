import React, { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { ListItem, Input } from 'react-native-elements';

import { CustomHeaderButton } from '../../Public/components';

import { actionEditAbout } from '../../Public/redux/action';

const EditAbout = props => {
  const { auth, users, editAbout, navigation } = props;
  const [userAbout, setUserAbout] = useState('');
  navigation.setOptions({
    title: 'Bio',
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
          editAbout({ userId: auth.uid, userAbout });
          navigation.goBack();
        }}
      />
    )
  });

  const handleChangeText = text => {
    setUserAbout(text);
  };

  return (
    <View {...{ style: { backgroundColor: '#ffffff', flex: 1 } }}>
      <ListItem
        title={
          <Input
            defaultValue={users.about}
            placeholder="Bio"
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
  editAbout: payload => dispatch(actionEditAbout(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAbout);
