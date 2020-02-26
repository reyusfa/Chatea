import React from 'react';
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import { Button as EButton, Icon } from 'react-native-elements';

import { color } from './Styles';

const Button = props => {
  return (
    <EButton
      {...props}
      titleStyle={{ ...styles.buttonTitle, ...props.titleStyle }}
      buttonStyle={{ ...styles.buttonButton, ...props.buttonStyle }}
      disabledTitleStyle={{
        ...styles.buttonTitle,
        ...props.disabledTitleStyle
      }}
      disabledStyle={{ ...styles.buttonButton, ...props.disabledStyle }}
    />
  );
};

const CustomHeaderButton = props => {
  return (
    <View style={styles.customHeaderButtonContainer}>
      <TouchableNativeFeedback
        onPress={props.onPress}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
        <View style={styles.customHeaderButtonContent}>
          <Icon
            type={props.iconType}
            name={props.iconName}
            color={color.Foreground}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonButton: {
    backgroundColor: color.Foreground,
    borderRadius: 10
  },
  buttonTitle: {
    color: color.Accent2
  },
  customHeaderButtonContainer: {
    width: '87%',
    height: '87%',
    borderRadius: 180,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  customHeaderButtonContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  }
});

export { Button, CustomHeaderButton };
