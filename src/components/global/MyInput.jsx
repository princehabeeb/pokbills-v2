import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { Theme } from '../../constants/Theme';
import MyIcon from './MyIcon';
import Title from './Title';
import { Users } from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';

const theme = Theme();
const MyInput = ({
  text,
  style,
  icon,
  password,
  error,
  props,
  type,
  onChangeText,
  value,
  material,
  contact,
  maxLength,
  inputStyle,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const navigation = useNavigation();
  return (
    <View style={[styles.container, style]}>
      <MyIcon name={icon} style={styles.icon} material={material} />
      <TextInput
        style={[
          styles.input,
          error && { borderColor: theme.palette.red },
          inputStyle,
        ]}
        placeholder={text}
        secureTextEntry={password && showPassword ? true : false}
        keyboardType={type}
        value={value}
        maxLength={maxLength}
        onChangeText={(text) => {
          // Remove all spaces from the input
          const textWithoutSpaces = text.replace(/\s/g, '');
          onChangeText(textWithoutSpaces);
        }}
        {...props}
      />
      {password && (
        <TouchableOpacity
          style={styles.iconRight}
          onPress={() => setShowPassword((prev) => !prev)}
        >
          <MyIcon name={showPassword ? 'eye' : 'eye-off'} size={30} />
        </TouchableOpacity>
      )}
      {contact && (
        <TouchableOpacity
          style={[styles.iconRight, { top: 45 }]}
          onPress={() => navigation.replace('contact list')}
        >
          <Users color={theme.palette.link} />
        </TouchableOpacity>
      )}
      {error && (
        <Title text={error} small color={theme.palette.red} position="start" />
      )}
    </View>
  );
};

export default MyInput;

const styles = StyleSheet.create({
  container: {
    marginTop: -10,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    borderWidth: 2,
    borderColor: 'gray',
    paddingLeft: 45,
  },
  icon: {
    transform: [{ translateY: 43 }, { translateX: 10 }],
    opacity: 0.8,
  },

  iconRight: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
});
