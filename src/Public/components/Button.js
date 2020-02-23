import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as EButton } from 'react-native-elements';

import { color } from './Styles';

const Button = props => {
  return (
    <EButton
      titleStyle={styles.buttonTitle}
      buttonStyle={styles.buttonButton}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  buttonButton: {
    backgroundColor: color.Foreground,
    borderRadius: 10
  },
  buttonTitle: {
    color: color.Accent2
  }
});

export { Button };
