import React, { useState, useEffect, useCallback, useMemo, FC } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Modal,
  ListRenderItem,
} from 'react-native';
import debounce from 'lodash/debounce';
import { X, ChevronDown } from 'lucide-react-native';
//
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import countries from './countries.json';
import { InputField, Spinner } from '@/components';
import { BorderRadius, COLORS } from '@/constants/theme';

/* ----------------------------------------- */
/*                TypeScript Types           */
/* ----------------------------------------- */
export interface CountryItem {
  emoji: string;
  emojiU: string;
  id: number;
  iso2: string;
  iso3: string;
  name: string;
  phonecode: string;
  sms: number;
  whatsapp: number;
}

interface CountryPickerModalProps {
  onSelect?: (country: CountryItem) => void;
}

/* ----------------------------------------- */
/*             Functional Component          */
/* ----------------------------------------- */

const CountryPickerModal: FC<CountryPickerModalProps> = ({ onSelect }) => {
  const [spinner, setSpinner] = useState(true);
  const [visible, setVisible] = useState(false);

  const [allCountries, setAllCountries] = useState<CountryItem[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<CountryItem[]>([]);

  const [item, setItem] = useState<CountryItem>({
    emoji: '🇮🇹',
    emojiU: 'U+1F1EE U+1F1F9',
    id: 107,
    iso2: 'IT',
    iso3: 'ITA',
    name: 'Italy',
    phonecode: '+39',
    sms: 1,
    whatsapp: 1,
  });

  /* Load data */
  useEffect(() => {
    setAllCountries(countries);
    setFilteredCountries(countries);
  }, []);

  /* Debounced Search */
  const onSearch = useMemo(
    () =>
      debounce((text: string) => {
        if (!text.trim()) {
          setFilteredCountries(allCountries);
          setSpinner(true);
        } else {
          const filtered = allCountries.filter(c =>
            c.name.toLowerCase().includes(text.toLowerCase()),
          );
          setFilteredCountries(filtered);
          setSpinner(true);
        }
      }, 300),
    [allCountries],
  );

  /* Close modal */
  const handleClose = useCallback(() => {
    setVisible(false);
    setSpinner(false);
    setFilteredCountries(allCountries);
  }, [allCountries]);

  /* Render item (memoized) */
  const renderItem: ListRenderItem<CountryItem> = useCallback(
    ({ item }) => (
      <TouchableHighlight
        underlayColor={'#00000020'}
        style={styles.row}
        onPress={() => {
          onSelect?.(item);
          setItem(item);
          handleClose();
        }}
      >
        <View style={styles.rowInner}>
          <Text style={styles.text}>{item.emoji}</Text>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{`(${item.phonecode})`}</Text>
        </View>
      </TouchableHighlight>
    ),
    [handleClose, onSelect],
  );

  return (
    <>
      {/* Trigger Button */}
      <TouchableOpacity
        style={styles.countrySelectBtn}
        onPress={() => {
          setVisible(true);
          setSpinner(true);
        }}
      >
        <Text style={styles.placeholder}>{item.emoji}</Text>
        <ChevronDown color={COLORS.neutral[400]}/>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={visible} transparent onRequestClose={handleClose}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {/* Close */}
            <View style={styles.closeContainer}>
              <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
                <X />
              </TouchableOpacity>
            </View>

            {/* Search */}
            <InputField
              placeholder="Search"
              onChangeText={onSearch}
              containerStyle={styles.searchInput}
            />

            {/* List */}
            <FlatList
              keyboardShouldPersistTaps="always"
              data={filteredCountries}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              ListFooterComponent={
                <View style={styles.footer}>{spinner && <Spinner />}</View>
              }
              onEndReached={() => setSpinner(false)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CountryPickerModal;

/* ----------------------------------------- */
/*                   Styles                  */
/* ----------------------------------------- */

const styles = StyleSheet.create({
  countrySelectBtn: {
    flexDirection: 'row',
    gap: scale(5),
    borderColor: COLORS.neutral[300],
    paddingHorizontal: scale(10),
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(50),
  },

  placeholder: {
    color: 'black',
    fontSize: moderateScale(18),
    textAlign: 'center'
  },

  overlay: {
    backgroundColor: COLORS.black_opacity,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '80%',
    height: '80%',
    backgroundColor: COLORS.white,
  },

  closeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    padding: scale(10),
  },

  closeBtn: {
    padding: scale(5),
  },

  searchInput: {
    marginHorizontal: scale(10),
    width: 'auto',
  },

  row: {
    padding: scale(5),
  },

  rowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(5),
  },

  text: {
    color: 'black',
    margin: scale(5),
    fontSize: moderateScale(12),
  },

  footer: {
    marginVertical: verticalScale(10),
  },
});
