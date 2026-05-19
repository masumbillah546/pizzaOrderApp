import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { MobileHeader } from '@/components';
import { COLORS } from '@/constants/theme';

import BG_Image from '@/assets/images/splash.png';

// --- Types ---
interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
}

const CHAT_HISTORY: ChatMessage[] = [
  {
    id: '1',
    text: 'HELLO',
    sender: 'user',
  },
  {
    id: '2',
    text: 'HI ! HOW CAN I HELP YOU',
    sender: 'agent',
  },
  {
    id: '3',
    text: 'I WANT TO KNOW ABOUT YOUR NEW PRODUCT',
    sender: 'user',
  },
];

const ChatScreen = () => {
  const [inputText, setInputText] = useState('');

  return (
    <ImageBackground
      source={BG_Image}
      style={styles.container}
      resizeMode="cover"
    >
      <MobileHeader title="CHAT" onMenu={() => {}} />
      <View
        // source={require('./assets/food_doodle_pattern.png')} // Replace with your seamless grey doodle background asset
        style={styles.chatBackground}
        resizeMode="repeat" // Tiles the background asset across the screen
      >
        <ScrollView
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        >
          {CHAT_HISTORY.map(msg => {
            const isUser = msg.sender === 'user';

            return (
              <View
                key={msg.id}
                style={[
                  styles.messageRow,
                  isUser ? styles.userRow : styles.agentRow,
                ]}
              >
                {/* Agent Avatar Symbol (Only shown next to Agent speech bubbles) */}
                {!isUser && (
                  <View style={styles.agentAvatar}>
                    <Text style={styles.avatarText}>A</Text>
                  </View>
                )}

                {/* Speech Bubble Box */}
                <View
                  style={[
                    styles.bubble,
                    isUser ? styles.userBubble : styles.agentBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      isUser ? styles.userText : styles.agentText,
                    ]}
                  >
                    {msg.text}
                  </Text>

                  {/* CSS Triangle Speech Tails */}
                  <View
                    style={[
                      styles.tail,
                      isUser ? styles.userTail : styles.agentTail,
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* --- Bottom Input Footer Bar --- */}
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="START YOUR CHAT |"
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} activeOpacity={0.8}>
          <Text style={styles.sendButtonText}>SEND</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  chatBackground: {
    flex: 1,
    width: '100%',
  },
  messagesList: {
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(20),
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: verticalScale(40), // Large structural gaps between conversational responses
    position: 'relative',
    maxWidth: '85%',
  },
  userRow: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  agentRow: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: scale(30), // Gives structural space for the absolute-aligned avatar
  },
  agentAvatar: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    backgroundColor: '#FFCC00', // Yellow UI contrast brand color
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: verticalScale(-8), // Positions the avatar lower left corner relative to bubble
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
  bubble: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(30), // Long oval bubble shape
    position: 'relative',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  userBubble: {
    backgroundColor: '#FFD36E', // Muted pale golden-yellow tone
    borderBottomRightRadius: moderateScale(4), // Flattens edge to link up with tail shape
  },
  agentBubble: {
    backgroundColor: '#F7C6A5', // Muted light pastel orange-peach tone
    borderBottomLeftRadius: moderateScale(4),
  },
  messageText: {
    fontSize: moderateScale(11),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  userText: {
    color: '#FFFFFF',
    textAlign: 'right',
  },
  agentText: {
    color: '#FFFFFF',
    textAlign: 'left',
  },
  /* --- Speech Bubble Tail Styling via Triangles --- */
  tail: {
    position: 'absolute',
    bottom: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
  },
  userTail: {
    right: scale(-6),
    borderTopWidth: verticalScale(12),
    borderTopColor: 'transparent',
    borderLeftWidth: scale(12),
    borderLeftColor: '#FFD36E', // Matches user bubble color
  },
  agentTail: {
    left: scale(-6),
    borderTopWidth: verticalScale(12),
    borderTopColor: 'transparent',
    borderRightWidth: scale(12),
    borderRightColor: '#F7C6A5', // Matches agent bubble color
  },
  /* --- Input Footer Styles --- */
  footerContainer: {
    flexDirection: 'row',
    height: verticalScale(55),
    width: '100%',
    backgroundColor: COLORS.theme, // Primary UI Theme Orange
  },
  inputField: {
    flex: 1,
    paddingHorizontal: scale(20),
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sendButton: {
    width: scale(90),
    backgroundColor: '#FFCC00', // Gold/Yellow UI button color
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default ChatScreen;
