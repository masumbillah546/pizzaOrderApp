import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { moderateScale, scale, verticalScale } from '../utils/ScreenSize';
import { COLORS, FontFamily, FontSizes, Spacing } from '@/constants/theme';
import Row from '@/components/Row';
import InputField from './InputField';

export const RadioButton = ({ isSelected }: { isSelected: boolean }) => {
  return (
    <TouchableOpacity disabled onPress={() => {}}>
      <View style={styles.radioButtonContainer}>
        {isSelected && <View style={styles.radioButton} />}
      </View>
    </TouchableOpacity>
  );
};

interface Props {
  onSelect?: any;
  style?: any;
  value?: string;
  onBlur?: () => void;
  placeholder?: string;
  placeholderTextColor?: string;
  data?: any[];
  label?: string;
  error_msg?: string;
}
export default function DropdownWithModal({
  onSelect = () => {},
  style,
  value = '',
  onBlur = () => {},
  placeholder,
  placeholderTextColor = 'gray',
  data = [],
  label,
  error_msg,
}: Props) {
  const [show, setShow] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({
    value: '',
    label: '',
  });
  const [modalVisible, setModalVisible] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState(
    data.find(d => d.label === value)?.value,
  );

  const handleSelected = (index: number, item: any) => {
    setModalVisible(!modalVisible);
    setRadioValue(index);
    onSelect(data[index]);
    setSelectedItem(data[index]);
    setShow(x => !x);
  };

  const handleShow = () => {
    setModalVisible(x => !x);
    setShow(x => !x);
  };

  return (
    <View>
      {label && (
        <Text style={styles.label}>
          {label} <Text style={{ marginLeft: scale(5), color: 'red' }}>*</Text>
        </Text>
      )}
      <TouchableOpacity onPress={handleShow}>
        <Row>
          <InputField
            editable={false}
            // style={{ paddingRight: moderateScale(30), ...style }}
            value={selectedItem.value ? selectedItem.label : ''}
            // onBlur={onBlur}
            placeholder={'Select'}
          />
          <View style={styles.rightIconContainer}>
            {show ? <ChevronUp /> : <ChevronDown />}
          </View>
        </Row>
      </TouchableOpacity>
      {error_msg && <Text style={styles.error_msg}>{error_msg}</Text>}
      <Modal
        visible={modalVisible}
        onRequestClose={handleShow}
        transparent
        animationType="none"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.black_opacity,
            justifyContent: 'center',
          }}
        >
          <TouchableWithoutFeedback onPress={handleShow}>
            <View
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              width: '50%',
              position: 'absolute',
              alignSelf: 'center',
              backgroundColor: 'white',
              paddingVertical: scale(15),
              borderRadius: scale(10),
              overflow: 'hidden',
            }}
          >
            {data.map((item, index) => (
              <TouchableHighlight
                key={index}
                underlayColor={'#17171733'}
                onPress={() => handleSelected(index, item)}
                style={{
                  paddingVertical: verticalScale(12),
                  paddingHorizontal: scale(15),
                }}
              >
                <Row>
                  <RadioButton isSelected={radioValue == index.toString()} />
                  <Text
                    style={{
                      marginHorizontal: scale(10),
                      fontWeight: '500',
                      color: 'black',
                      fontSize: moderateScale(12),
                    }}
                  >
                    {item.label}
                  </Text>
                </Row>
              </TouchableHighlight>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: FontFamily.heading.medium,
    fontSize: FontSizes.sm,
    color: COLORS.neutral[700],
    marginBottom: Spacing.xs,
  },
  radioButtonContainer: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(20) / 2,
    borderWidth: moderateScale(2),
    borderColor: COLORS.theme,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(12) / 2,
    backgroundColor: COLORS.theme,
  },

  rightIconContainer: {
    position: 'absolute',
    right: scale(10),
    top: 0,
    height: moderateScale(46),
    alignSelf: 'center',
    opacity: 0.3,
    justifyContent: 'center',
  },
  error_msg: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: 'red',
  },
});
