import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem as EListItem } from 'react-native-elements';

import { color } from './Styles';

const ListItem = props => {
  return (
    <EListItem
      contentContainerStyle={styles.listItemContentContainer}
      containerStyle={styles.listItemContainer}
      {...props}
    />
  );
};

const ListItemFooter = props => {
  return <View style={styles.View}>{props.children}</View>;
};

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: 'transparent'
  },
  listItemContentContainer: {
    backgroundColor: color.Accent4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: color.Foreground
  },
  View: {
    padding: 8
  }
});

export { ListItem, ListItemFooter };
