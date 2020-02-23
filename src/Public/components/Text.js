import React from 'react';
import { View } from 'react-native';
import { Text as EText } from 'react-native-elements';

import { fontFamily, color } from './Styles';

const Text = props => {
  return (
    <EText style={{ ...fontFamily.Regular, ...props.textStyle }} {...props}>
      {props.children}
    </EText>
  );
};

const TextInView = props => {
  return (
    <View {...props.viewProps}>
      <Text
        textStyle={props.textPrimary ? { color: color.Foreground } : {}}
        {...props.textProps}>
        {props.title}
      </Text>
    </View>
  );
};

export { Text, TextInView };
