import {
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { BorderRadius, COLORS, Spacing } from '@/constants/theme';
import {
  ChevronDown,
  ChevronUp,
  PencilLine,
  FileImage,
} from 'lucide-react-native';
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import { Row, AppText } from '@/components';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import TechnicianProfileService from '@/services/TechnicianProfileService';
import { useAuth } from '@/hooks';
import ImageZoomView from './ImageZoomView';

type Props = {
  title: string;
  onEditPress?: () => void;
};

const CollapsableDocCard = ({ title, onEditPress = () => {} }: Props) => {
  const { appData } = useAuth();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [hasLoadedDocs, setHasLoadedDocs] = React.useState(false);
  const contentHeight = useSharedValue(0);
  const height = useSharedValue(0);
  const [visible, setVisible] = React.useState(false);
  const [file, setFile] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [docs, setDocs] = React.useState([]);

  const handleCollapse = React.useCallback(() => {
    setIsCollapsed(previous => {
      const next = !previous;
      height.value = withTiming(next ? contentHeight.value : 0, {
        duration: 250,
      });
      return next;
    });
  }, [contentHeight, height]);

  useEffect(() => {
    if (docs.length > 0) {
      const timer = setTimeout(() => {
        handleCollapse();
      }, 100);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [docs, handleCollapse]);

  const loadDocs = async () => {
    setLoading(true);
    try {
      const resDoc =
        await TechnicianProfileService.getProfessionalEntitiesDocuments(
          appData.professional_entity_id,
        );

      if (resDoc?.success) {
        setDocs(resDoc?.data?.documents || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setHasLoadedDocs(true);
      setLoading(false);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden',
  }));

  return (
    <Card>
      <TouchableHighlight
        underlayColor={COLORS.neutral[100]}
        onPress={() => {
          if (docs.length > 0) handleCollapse();
          else loadDocs();
        }}
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

      {loading && (
        <ActivityIndicator
          color={COLORS.theme}
          style={{ marginVertical: verticalScale(10), marginBottom: verticalScale(20) }}
        />
      )}

      {hasLoadedDocs && docs.length === 0 && !loading && (
        <View style={styles.emptyState}>
          <AppText style={styles.emptyTitle}>No documents uploaded yet</AppText>
          <AppText style={styles.emptySubtitle}>
            Add your required verification documents here.
          </AppText>
          <Row style={{ marginTop: verticalScale(8), justifyContent: 'flex-end' }}>
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
      )}

      <Animated.View style={animatedStyle}>
        <View
          onLayout={e => {
            contentHeight.value = e.nativeEvent.layout.height;
          }}
          style={styles.hidden}
        >
          <View
            style={[
              { backgroundColor: COLORS.neutral[200], gap: 1, },
            ]}
          >
            {docs.map((doc, index) => (
              <Row key={index} style={styles.info}>
                <AppText style={styles.label}>
                  {doc.document_type_name_en} :
                </AppText>
                {/* <AppText style={styles.value}>{doc.document_type_name_en}</AppText> */}

                <TouchableOpacity
                  onPress={() => {
                    setVisible(true);
                    setFile(doc.file_url);
                  }}
                  style={styles.value}
                >
                  <FileImage
                    size={moderateScale(25)}
                    strokeWidth={1}
                    color={COLORS.neutral[700]}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => {
                    setVisible(true);
                    setFile(doc.file_url);
                  }}
                  style={styles.value}
                >
                  <Trash2
                    size={moderateScale(20)}
                    strokeWidth={2}
                    color={COLORS.error[500]}
                  />
                </TouchableOpacity> */}
              </Row>
            ))}
            {/* <HRLine /> */}
          </View>
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
      <ImageZoomView
        modalVisible={visible}
        setModalVisible={setVisible}
        uri={file}
        // error={error}
      />
    </Card>
  );
};

export const Card = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.card}>{children}</View>;
};

export default CollapsableDocCard;

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
  },
  emptyState: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    gap: verticalScale(4),
  },
  emptyTitle: {
    fontWeight: 'bold',
    color: COLORS.neutral[800],
  },
  emptySubtitle: {
    color: COLORS.neutral[600],
  },
  info: {
    // alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: scale(5),
    backgroundColor: 'white',
    paddingVertical: verticalScale(5),
  },
  label: {
    width: '60%',
    color: COLORS.neutral[800],
  },
  value: {
    // flex: 1,
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    borderRadius: moderateScale(40) / 2,
    backgroundColor: COLORS.neutral[100],
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
