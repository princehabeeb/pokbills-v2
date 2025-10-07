import React from 'react';
import { View, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import TransparentButton from '../global/TransParentButton';

const MyBottomSheet = ({ snapPoints, header, children }) => {
  // ref
  const bottomSheetRef = React.useRef(null);

  // variables
  const snapPointsFromTop = React.useMemo(
    () => ['25%', '50%', '70%', '100%'],
    []
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white', position: 'relative' }}>
      <TransparentButton
        text="Open Bottom Sheet"
        onPress={() => {
          bottomSheetRef.current.expand();
        }}
      />
      {children}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPointsFromTop}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: '600' }}>{header}</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default MyBottomSheet;
