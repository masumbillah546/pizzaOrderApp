import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import debounce from 'lodash/debounce';
//
import type { RootStackParamList } from '@/navigation/types';
import { ProductCard, CartCounter, MobileHeader } from '@/components';
import { moderateScale, scale } from '@/utils/ScreenSize';
import { COLORS } from '@/constants/theme';
import { Search } from 'lucide-react-native/icons';
// import { MobileHeader } from '@/components/MobileHeader';
import { useSessionStore } from '@/stores/sessionStore';
// import { apiRequest } from '@/api/client';
// import { DEFAULT_API_BASE_URL } from '@/config/env';
import FlatListFooter from '@/components/flatListComponents/FlatListFooter';
import FlatListEmptyMessage from '@/components/flatListComponents/FlatListEmptyMessage';

const Data = [
  {
    id: 1,
    name: 'Pizza',
    price: 100,
    image: 'https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800',
  },
  {
    id: 2,
    name: 'Coffee',
    price: 200,
    oldPrice: 300,
    image: 'https://images.immediate.co.uk/production/volatile/sites/30/2022/04/Iced-Caramel-Macchiato-f4a10f9.jpg?quality=90&resize=708,643',
  },
  {
    id: 3,
    name: 'Coke',
    price: 300,
    image: 'https://www.eatright.org/-/media/images/unaccounted-for/hard-facts-about-soft-drinks-872739128.jpg?as=0&w=967&rev=f83dfb73834d4676912c65ba2848586c&hash=942F1CBA832CED4029AF48C5FA16CDF6',
  },
  {
    id: 4,
    name: 'Pizza',
    price: 100,
    image: 'https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800',
  },
  {
    id: 5,
    name: 'Coffee',
    price: 200,
    image: 'https://images.immediate.co.uk/production/volatile/sites/30/2022/04/Iced-Caramel-Macchiato-f4a10f9.jpg?quality=90&resize=708,643',
  },
  {
    id: 6,
    name: 'Coke',
    price: 300,
    image: 'https://www.eatright.org/-/media/images/unaccounted-for/hard-facts-about-soft-drinks-872739128.jpg?as=0&w=967&rev=f83dfb73834d4676912c65ba2848586c&hash=942F1CBA832CED4029AF48C5FA16CDF6',
  },
]

export default function ProductsScreen({
  navigation,
  route,
}) {
  const showSearch = route.params?.showSearch ?? false;
  const categoryId = route.params?.categoryId ?? null;
  const token = useSessionStore(state => state.token);
  const [ loading, setLoading ] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState(Data ?? []);
  const [meta, setMeta] = useState({
    offset: 0,
    limit: 20,
    total: 0,
  });
  const [query, setQuery] = useState('');

  const getProducts = useCallback(
    async (_offset = 0, query = '') => {
      if (_offset === 0) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      setQuery(query);

      try {
        // const response = await apiRequest<{ success: boolean; data: [], meta: any }>(
        //   {
        //     apiBaseUrl: DEFAULT_API_BASE_URL,
        //     token: token,
        //   },
        //   `/member/shop/products?name=${query ?? ''}&category_id=${
        //     categoryId ?? ''
        //   }&offset=${_offset}&limit=20`,
        //   {
        //     method: 'GET',
        //   },
        // );
        // if (response.success) {
        //   // Handle the response data as needed
        //   setOffset(_offset + response?.data?.length);
        //   setMeta(response?.meta ?? {});

        //   if (_offset === 0) {
        //     setData(response.data);
        //   } else {
        //     setData(prevData => [...prevData, ...response.data]);
        //   }
        // }
      } catch (error) {
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [categoryId, token],
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // const onRefresh = async (): Promise<void> => {
  //   setIsLoadOnRefresh(true);
  //   try {
  //     await getProposals(1, selectedStatus);
  //   } catch {}
  //   setIsLoadOnRefresh(false);
  // };

  const loadMore = useCallback(() => {
    if (!loadingMore && !loading && offset < meta.total) {
      getProducts(data.length, query);
    }
  }, [
    loadingMore,
    loading,
    offset,
    meta.total,
    getProducts,
    data.length,
    query,
  ]);

  const renderItem = useCallback(
    ({ item }: any) => {
      return <ProductCard item={item} navigation={navigation} />;
    },
    [navigation],
  );

  const performSearch = debounce(async (_query: string) => {
    try {
      getProducts(0, _query);
    } catch (e) {
      console.log('search err', e);
    }
  }, 300);

  return (
    <View style={styles.container}>
      <MobileHeader
        title="All Food"
        // onBack={() => navigation.goBack()}
        leftIcon={<CartCounter />}
        onMenu={() => {}}
        onLeftPress={() => navigation.navigate('CartScreen')}
      />
      {/* {showSearch && (
        <FormField
          placeholder="Search"
          leftIcon={
            <Search color={COLORS.neutral[500]} size={moderateScale(24)} />
          }
          containerStyle={styles.searchContainer}
          onChangeText={performSearch}
        />
      )} */}
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{
          gap: moderateScale(10),
          justifyContent: 'space-between',
        }}
        contentContainerStyle={styles.contentContainer}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<FlatListFooter isLoadMore={loadingMore} />}
        ListEmptyComponent={() =>
          !loading && (
            <FlatListEmptyMessage no_item_message="No products found" />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: scale(16),
    paddingBottom: 0,
    marginBottom: 0,
  },
  contentContainer: {
    flexGrow: 1,
    gap: moderateScale(15),
    padding: scale(16),
  },
});
