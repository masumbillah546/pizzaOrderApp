// LoadingContext.js
import React, {createContext, useState} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import ScreenSize from '../utils/ScreenSize';
import {Spinner} from '../components';

export const LoadingContext = createContext();

export const LoadingProvider = ({children}) => {
  const [loading, setLoading] = useState(false);

  const handleSkip = async () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{setLoading}}>
      {children}
      <Modal
        animationType="fade" //slide
        transparent={true}
        visible={loading}
        // onRequestClose={handleSkip}
      >
        <View style={styles.container} />
        <View style={styles.modalBody}>
          <Spinner color="white" />
        </View>
      </Modal>
    </LoadingContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.5,
    justifyContent: 'center',
  },
  modalBody: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: ScreenSize.SH,
    width: ScreenSize.SW,
  },
});
