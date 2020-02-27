import React, { useEffect, useCallback, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { ListItem, Avatar } from 'react-native-elements';

import { firebaseDatabase } from '../../Public/config/firebase';

import { objectToArray } from '../../Public/helper';

import { Button } from '../../Public/components';
import { color, fontFamily } from '../../Public/components/Styles';

import { actionAddContact } from '../../Public/redux/action';

const People = props => {
  const { auth, navigation, addContact } = props;
  const [peoples, setPeoples] = useState([]);
  const [renderLoading, setRenderLoading] = useState(false);

  navigation.setOptions({
    title: 'Find People'
  });

  const rootRef = firebaseDatabase.ref();

  const _getPeoples = useCallback(async () => {
    setRenderLoading(true);
    try {
      await rootRef.child('peoples').on('value', async result => {
        // const contact = await rootRef.child('contacts').child(auth.uid)

        // console.log(result);

        const data = result.val() !== null ? result.val() : {};
        setPeoples(objectToArray(data));
        setRenderLoading(false);
      });
    } catch (error) {
      // console.log(error);
      setRenderLoading(false);
    }
  }, [rootRef]);

  useEffect(() => {
    _getPeoples();
  }, [_getPeoples]);

  const _addContact = async ({ peopleId }) => {
    try {
      await addContact({ userId: auth.uid, peopleId });
    } catch (error) {
      // console.log(error);
    }
  };

  return renderLoading ? (
    <View {...{ style: { padding: 16 } }}>
      <ActivityIndicator size="large" color={color.Foreground} />
    </View>
  ) : (
    <View {...{ style: { backgroundColor: '#ffffff', flex: 1 } }}>
      <FlatList
        data={peoples}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ListItem
            {...{
              title: item.displayName || item.email,
              ...(item.email && item.displayName
                ? { subtitle: item.email }
                : {}),
              titleStyle: { ...fontFamily.Bold },
              titleProps: { numberOfLines: 1 },
              containerStyle: {
                padding: 10,
                borderColor: color.Accent2,
                borderBottomWidth: 1
              },
              pad: 16
            }}
            leftAvatar={
              <Avatar
                {...{
                  title:
                    (item.displayName && item.displayName[0].toUpperCase()) ||
                    (item.email && item.email[0].toUpperCase()),
                  ...(item.photoURL ? { source: { uri: item.photoURL } } : {}),
                  titleStyle: { color: color.Foreground, ...fontFamily.Bold },
                  placeholderStyle: {
                    backgroundColor: color.Background
                  },
                  overlayContainerStyle: {
                    backgroundColor: color.Background,
                    elevation: 2
                  },
                  rounded: true,
                  size: 55
                }}
              />
            }
            rightIcon={
              <Button
                {...{ buttonStyle: { paddingVertical: 5 } }}
                title="Add"
                onPress={() => _addContact({ peopleId: item._id })}
              />
            }
          />
        )}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  addContact: payload => dispatch(actionAddContact(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(People);
