import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import {
  AppText,
  ButtonLarge,
  GlowingSeparator,
  MobileHeader,
} from '@/components';
import { COLORS, FontSizes } from '@/constants/theme';
import RattingModal from '@/components/modals/RattingModal';
import ProgressRingLarge from './components/ProgressRingLarge';

// --- Types ---
interface TimelineStep {}

const PickupTimeScreen = () => {
  const [isOrderSuccessModalVisible, setIsOrderSuccessModalVisible] =
    React.useState(false);
  const [isRattingModalVisible, setIsRattingModalVisible] =
    React.useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <MobileHeader title="PICK UP TIME" />
      <GlowingSeparator />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thank for your patience</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AppText style={{ fontSize: FontSizes.md }}>
          Your Order ID:{' '}
          <AppText style={{ color: COLORS.error[900] }}>D5FX2</AppText>
        </AppText>
        <AppText style={{ fontSize: moderateScale(18), fontWeight: '700' }}>
          Thanks You!!
        </AppText>
        <ProgressRingLarge />
        <AppText
          style={{
            fontSize: moderateScale(13),
            fontWeight: '700',
            textAlign: 'center',
            maxWidth: '90%',
            marginTop: verticalScale(20),
          }}
        >
          Please wait, we get your message and get your food within 20 minuets
        </AppText>

        <ButtonLarge
          title="Rate Now"
          onPress={() => setIsRattingModalVisible(true)}
          style={styles.btn}
        />
      </ScrollView>
      <RattingModal
        visible={isRattingModalVisible}
        onClose={() => setIsRattingModalVisible(false)}
        onSubmit={() => {}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: COLORS.theme, // Primary Brand Orange
    paddingVertical: verticalScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(15),
    fontWeight: '400',
  },
  boldText: {
    fontWeight: 'bold',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: verticalScale(30),
    gap: verticalScale(20),
  },
  btn: {
    marginTop: 'auto',
    marginBottom: verticalScale(70),
  },
});

export default PickupTimeScreen;
