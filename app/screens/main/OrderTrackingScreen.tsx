import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Check, Clock, Circle, Home } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { GlowingSeparator, MobileHeader } from '@/components';
import { COLORS } from '@/constants/theme';
import ProgressRing from './components/ProgressRing';

// --- Types ---
interface TimelineStep {
  id: string;
  title: string;
  time: string;
  status: 'completed' | 'running' | 'pending';
  accentColor?: string;
}

const TRACKING_STEPS: TimelineStep[] = [
  {
    id: '1',
    title: 'Order is taken',
    time: 'at 9.42 AM',
    status: 'completed',
    accentColor: '#E9967A', // Peach/Orange checkbox fill
  },
  {
    id: '2',
    title: 'Food is ready',
    time: 'at 10.00 AM',
    status: 'completed',
    accentColor: '#FFCC00', // Yellow checkbox fill
  },
  {
    id: '3',
    title: 'Packed the Food  ( Running )',
    time: 'at 10.05 AM',
    status: 'running',
    accentColor: '#F4A472', // Orange text highlight
  },
  {
    id: '4',
    title: 'On Road',
    time: 'at ---------',
    status: 'pending',
  },
  {
    id: '5',
    title: 'Received food',
    time: 'at ---------',
    status: 'pending',
  },
];

const OrderTrackingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <MobileHeader
        leftIcon={<Home size={moderateScale(24)} color="white" />}
        onLeftPress={() => navigation.navigate('HomeScreen')}
        title="Order Tracking"
        onMenu={() => {}}
      />
      <GlowingSeparator />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Your Order ID : <Text style={styles.boldText}>D5FX2</Text>
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- Timer Block --- */}
        <View style={styles.timerContainer}>
          {/* Circular Countdown Ring Graphic Element */}
          <ProgressRing />

          {/* Time Context Text Rows */}
          <View style={styles.timeContextBlock}>
            <Text style={styles.orderAtText}>Order At - 9:41 AM</Text>
            <Text style={styles.remainingText}>
              <Text style={styles.remainingCount}>17</Text> Minute Remaining
            </Text>
          </View>
        </View>

        {/* --- Dark Vertical Status Timeline Section --- */}
        <View style={styles.timelineCard}>
          <Text style={styles.timelineHeader}>Status</Text>

          {TRACKING_STEPS.map((step, index) => {
            const isLast = index === TRACKING_STEPS.length - 1;
            const isCompleted = step.status === 'completed';
            const isRunning = step.status === 'running';

            return (
              <View key={step.id} style={styles.stepContainer}>
                {/* Vertical Line Column Node */}
                <View style={styles.lineIndicatorColumn}>
                  {/* Indicator Icon Node Wrapper */}
                  <View style={styles.iconWrapper}>
                    {isCompleted && (
                      <View
                        style={[
                          styles.completedDot,
                          { backgroundColor: step.accentColor },
                        ]}
                      >
                        <Check
                          size={moderateScale(11)}
                          color="#FFFFFF"
                          strokeWidth={3}
                        />
                      </View>
                    )}
                    {isRunning && (
                      <Clock
                        size={moderateScale(20)}
                        color="#F4A472"
                        strokeWidth={2}
                      />
                    )}
                    {step.status === 'pending' && (
                      <Circle
                        size={moderateScale(18)}
                        color="#666666"
                        strokeWidth={2.5}
                      />
                    )}
                  </View>

                  {/* Vertical linking divider line (suppressed on the last element) */}
                  {!isLast && (
                    <View
                      style={[
                        styles.verticalLine,
                        isCompleted && styles.completedLine,
                      ]}
                    />
                  )}
                </View>

                {/* Right Metadata Text Content Column */}
                <View style={styles.stepInfoColumn}>
                  <Text
                    style={[
                      styles.stepTitle,
                      isRunning && styles.runningTitleText,
                      step.status === 'pending' && styles.pendingText,
                    ]}
                  >
                    {step.title}
                  </Text>
                  <Text
                    style={[
                      styles.stepTime,
                      isRunning && styles.runningTimeText,
                      step.status === 'pending' && styles.pendingText,
                    ]}
                  >
                    {step.time}
                  </Text>
                </View>
              </View>
            );
          })}

          {/* Bottom Complete CTA Layer Anchor */}
          <TouchableOpacity style={styles.finishBtn} activeOpacity={0.8}>
            <Text style={styles.finishBtnText}>Finish Purchase</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  },
  /* --- Timer Elements --- */
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(25),
    paddingVertical: verticalScale(35),
    backgroundColor: '#FFFFFF',
  },

  timeContextBlock: {
    marginLeft: scale(25),
    justifyContent: 'center',
  },
  orderAtText: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: '#000000',
    marginBottom: verticalScale(14),
  },
  remainingText: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#000000',
  },
  remainingCount: {
    color: '#F4A472', // Muted red/orange emphasis text
    fontSize: moderateScale(24),
    fontWeight: '300',
  },
  /* --- Timeline Container Layout --- */
  timelineCard: {
    flex: 1,
    backgroundColor: '#404040', // Deep charcoal backing panel container
    paddingHorizontal: scale(25),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(15),
  },
  timelineHeader: {
    color: '#FFFFFF',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    marginBottom: verticalScale(22),
  },
  stepContainer: {
    flexDirection: 'row',
    minHeight: verticalScale(65),
  },
  lineIndicatorColumn: {
    alignItems: 'center',
    width: scale(24),
  },
  iconWrapper: {
    height: verticalScale(22),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  completedDot: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalLine: {
    width: scale(2),
    flex: 1,
    backgroundColor: '#5A5A5A', // Inactive base track color
    marginVertical: verticalScale(2),
  },
  completedLine: {
    backgroundColor: '#FFCC00', // Active line matching step 2 boundary link highlights
  },
  stepInfoColumn: {
    flex: 1,
    marginLeft: scale(15),
    paddingTop: verticalScale(1),
  },
  stepTitle: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  stepTime: {
    fontSize: moderateScale(11),
    color: '#CCCCCC',
    marginTop: verticalScale(4),
  },
  runningTitleText: {
    color: '#F4A472', // Highlights currently executing processing tracks
  },
  runningTimeText: {
    color: '#D27D46',
  },
  pendingText: {
    color: '#777777', // Dimmed text palette for upcoming stages
  },
  finishBtn: {
    marginTop: 'auto',
    paddingVertical: verticalScale(15),
    alignItems: 'flex-start',
  },
  finishBtnText: {
    color: '#8A8A8A', // Dull white/grey stylistic baseline marker footer
    fontSize: moderateScale(24),
    fontWeight: 'bold',
  },
});

export default OrderTrackingScreen;
