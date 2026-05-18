import { StyleSheet } from 'react-native';
import React from 'react';
import { Container, AppText } from '@/components';

type Props = {};

const WebViewScreen = (props: Props) => {
  return (
    <Container>
      <AppText>{`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.\n
It is a long established fact that a reader will be distracted by the readable \n
It is a long established fact that a reader will be distracted by the readable \n
It is a long established fact that a reader will be distracted by the readable \n
It is a long established fact that a reader will be distracted by the readable \n
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`}</AppText>
    </Container>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({});
