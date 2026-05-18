import { Pressable, StyleSheet, TouchableHighlight, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { BorderRadius, COLORS, Spacing } from '@/constants/theme';
import { ChevronDown, ChevronUp, PencilLine } from 'lucide-react-native';
import { moderateScale, verticalScale } from '@/utils/ScreenSize';
import { Row, AppText } from '@/components';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  title: string;
  onEditPress?: () => void;
  children?: React.ReactNode;
};

const CollapsableCard = ({
  title,
  onEditPress = () => {},
  children,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const contentHeight = useSharedValue(0);
  const height = useSharedValue(0);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    height.value = withTiming(isCollapsed ? 0 : contentHeight.value, {
      duration: 250,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden',
  }));

  return (
    <Card>
      <TouchableHighlight
        underlayColor={COLORS.neutral[100]}
        onPress={handleCollapse}
      >
        <Row style={styles.header}>
          <AppText style={styles.headerTitle}>{title}</AppText>
          {isCollapsed ? (
            <ChevronUp size={moderateScale(20)} />
          ) : (
            <ChevronDown size={moderateScale(20)} />
          )}
        </Row>
      </TouchableHighlight>
      <Animated.View style={animatedStyle}>
        <View
          onLayout={e => {
            contentHeight.value = e.nativeEvent.layout.height;
          }}
          style={styles.hidden}
        >
          {children}
          <Row style={{ marginTop: 'auto', justifyContent: 'flex-end' }}>
            <TouchableHighlight
              onPress={onEditPress}
              underlayColor={COLORS.active_bg}
              style={styles.btn}
            >
              <PencilLine
                size={moderateScale(18)}
                color={COLORS.neutral[600]}
              />
            </TouchableHighlight>
          </Row>
        </View>
      </Animated.View>
    </Card>
  );
};

export const Card = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.card}>{children}</View>;
};

export default CollapsableCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    elevation: 2,
  },
  header: {
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  hidden: {
    padding: Spacing.md,
    // paddingTop: 0,
    gap: verticalScale(10),
    position: 'absolute',
    opacity: 1,
    zIndex: -1,
    left: 0,
    right: 0,
    // backgroundColor: COLORS.neutral[100],
  },
  btn: {
    height: moderateScale(40),
    aspectRatio: 1,
    borderRadius: moderateScale(40) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -Spacing.sm,
    marginTop: -Spacing.sm,
  },
});
