import { Dimensions, Platform } from 'react-native';
import { Appearance } from 'react-native';

export const Theme = () => {
  return {
    palette: {
      primary: '#0018ff',
      secondary: '#000d8b',
      white: '#fff',
      black: '#424242',
      red: '#c5221f',
      link: '#486be8',
      gray: '#e0e0e0',
      grayDark: 'gray',
    },

    window: {
      windowWidth: Dimensions.get('window').width,
      windowHeight: Dimensions.get('window').height,
    },
    shadow: {
      elevation: 2,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.8,
      shadowRadius: 6,
    },
    ShadowLight: {
      elevation: 2,
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
    },
    font: {},
    os: Platform.OS,
    appName: 'Alfadatasub',
  };
};
