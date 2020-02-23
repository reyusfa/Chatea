import React from 'react';
import { StyleSheet } from 'react-native';
import { Input as EInput } from 'react-native-elements';

import { color, fontFamily } from './Styles';

const Input = props => {
  return (
    <EInput
      inputStyle={styles.inputInput}
      containerStyle={styles.inputContainer}
      inputContainerStyle={styles.inputInputContainer}
      labelStyle={styles.inputLabel}
      errorProps={{ style: styles.inputError }}
      {...props}
      leftIcon={{ color: color.Foreground, ...props.leftIcon }}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 8
  },
  inputInputContainer: {
    borderColor: color.Foreground
  },
  inputLabel: {
    color: color.Foreground
  },
  inputInput: { ...fontFamily.Regular, color: color.Foreground },
  inputError: { ...fontFamily.Regular }
});

export { Input };
