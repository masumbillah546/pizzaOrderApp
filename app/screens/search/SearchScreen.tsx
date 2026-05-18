import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
} from 'react-native';
//
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import { COLORS, FontSizes, Spacing } from '@/constants/theme';
import { Button, Row, AppText } from '@/components';
import { Cross, Clock, X } from 'lucide-react-native';
import SearchBar from './components/SearchBar';

export default function SearchScreen({ navigation }: any) {
  const [items, setItems] = useState([
    'Clothing & Fashion',
    'Grocery Store',
    'Beauty & Care',
    'Electronics & Tech',
    'Book Shop',
    'Grocery Store',
    'Beauty & Care',
    'Electronics & Tech',
    'Book Shop',
  ]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const bottomSheet = useRef(null);

  const data = useMemo(() => {
    if (searchQuery.trim() !== '') {
      return items.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
  }, [searchQuery, items?.length]);

  const toggleSelection = (item: string) => {
    // navigation.replace('ServiceListScreen', { searchText: item });
    navigation.replace('TicketMatching', { searchText: item });
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <SearchBar
        onChangeText={setSearchQuery}
        onPressDropdown={() => bottomSheet.current?.expand()}
      />
      <FlatList
        data={data}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableHighlight
            underlayColor={COLORS.neutral[100]}
            onPress={() => toggleSelection(item)}
          >
            <Row style={styles.searchItem}>
              <Clock size={moderateScale(18)} color={COLORS.neutral[600]} />
              <AppText style={styles.searchItemText}>{item}</AppText>
              <TouchableOpacity
                onPress={() => toggleSelection(item)}
                style={{}}
              >
                <X size={moderateScale(18)} color={COLORS.neutral[600]} />
              </TouchableOpacity>
            </Row>
          </TouchableHighlight>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.pageContainerHorizontal,
    paddingTop: Spacing.sm,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: Spacing.sm,
  },
  searchItem: {
    paddingRight: scale(15),
    paddingLeft: scale(5),
    justifyContent: 'space-between',
    borderRadius: moderateScale(5),
    height: verticalScale(40),
    gap: scale(5),
  },
  searchItemText: {
    fontSize: moderateScale(14),
    lineHeight: verticalScale(16),
    color: COLORS.neutral[600],
    flex: 1,
  },
});
