import React, { useState } from 'react';
import { StyleSheet, Keyboard, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//
import { moderateScale, verticalScale } from '@/utils/ScreenSize';
import { useAlert, useLanguage, useLoading } from '@/hooks';
import { InputField, Button, Container } from '@/components';
// import Dropdown from '@/components/Dropdown';
import TechnicianService from '@/services/TechnicianService';

export default function Support({ navigation }: { navigation: any }) {
  const { language } = useLanguage();
  const { showFailedAlert, showSuccessAlert } = useAlert();
  const { setLoading } = useLoading();

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        issue_type: yup.object().required(language.required),
        phone: yup.string().required(language.required),
        comment: yup.string().required(language.required),
      }),
    ),
    mode: 'onSubmit',
    defaultValues: {
      issue_type: undefined,
      phone: '',
      comment: '',
    },
  });
  const onSubmit = async (values: any) => {
    Keyboard.dismiss();

    return;

    setLoading(true);

    try {
      const res = await TechnicianService.support(values);

      if (res?.success === true && res?.data?.user_exists === false) {
        showSuccessAlert();
        navigation.navigate('LoginScreen');
      } else if (res?.data?.user_exists) {
        showFailedAlert();
      } else {
        showFailedAlert();
      }
    } catch (e) {
      showFailedAlert();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Dropdown
            label="Issue Type"
            placeholder="Enter Issue Type"
            value={value}
            onSelect={onChange}
            error={errors.issue_type?.message}
            data={[
              {
                label: 'issue 1',
                value: '1',
              },
              {
                label: 'issue 2',
                value: '2',
              },
            ]}
          />
        )}
        name="issue_type"
      /> */}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField
            label="Contact Phone"
            placeholder="Enter Contact Phone"
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
            error={errors.phone?.message}
          />
        )}
        name="phone"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField
            label="Comment"
            placeholder="Enter Comment"
            value={value}
            onChangeText={onChange}
            error={errors.comment?.message}
            multiline
            inputContainerStyle={{ height: verticalScale(120) }}
            style={{ textAlignVertical: 'top' }}
          />
        )}
        name="comment"
      />
      <View style={{ marginTop: 'auto' }}>
        <Button
          title={'Submit'}
          onPress={handleSubmit(onSubmit)}
          style={styles.btn}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: moderateScale(46),
    marginVertical: verticalScale(20),
  },
});
