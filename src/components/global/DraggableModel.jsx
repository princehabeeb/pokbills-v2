import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { View } from 'react-native';

import TransparentButton from './TransParentButton';
import { StyleSheet } from 'react-native';
import { Theme } from '../../constants/Theme';

const theme = Theme();
const DraggableModel = forwardRef(
  ({ children, buttonText, ...otherProps }, ref) => {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const sheetRef = useRef();
    const snapPoints = ['80%', '100%'];

    const closeModel = () => {
      setIsBottomSheetVisible(false);
    };

    useImperativeHandle(ref, () => ({
      closeModel,
    }));

    return (
      <>
        <View style={styles.container}>
          <TransparentButton
            text={buttonText || 'Create A Ticket'}
            onPress={() => {
              setIsBottomSheetVisible(true);
              sheetRef.current?.snapToIndex(0);
            }}
          />
        </View>

        {isBottomSheetVisible && (
          <BottomSheet
            detached
            enablePanDownToClose
            ref={sheetRef}
            animateOnMount
            snapPoints={snapPoints}
            index={0}
            style={styles.contentContainer}
            {...otherProps}
          >
            {children}
          </BottomSheet>
        )}
      </>
    );
  }
);
export default DraggableModel;
const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
    ...theme.shadow,
    padding: 10,
    zIndex: 100,
  },
});
