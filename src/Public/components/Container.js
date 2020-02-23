import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { color } from './Styles';

const ContainerScrollView = props => {
  return (
    <ScrollView style={styles.ScrollView} {...props}>
      {props.children}
    </ScrollView>
  );
};

export { ContainerScrollView };

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: color.Background
  }
});
