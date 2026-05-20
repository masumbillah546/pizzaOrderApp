import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path, Defs, ClipPath, Image as SvgImage } from 'react-native-svg';

const ProfilePhoto = ({ navigation }) => {

  return (
    <Svg width={150} height={150} viewBox="0 0 260 260">
      <Defs>
        {/* Triangle Shape */}
        <ClipPath id="clip">
          <Path
            d="
                M130 20
                Q220 40 210 180
                Q120 250 40 180
                Q20 80 130 20
              "
          />
        </ClipPath>
      </Defs>

      {/* Image */}
      <SvgImage
        href={{
          uri: 'https://img.magnific.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740&q=80',
        }}
        width="260"
        height="260"
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#clip)"
      />

      {/* Main yellow border */}
      <Path
        d="
            M130 20
            Q220 40 210 180
            Q120 250 40 180
            Q20 80 130 20
          "
        fill="none"
        stroke="#FFC107"
        strokeWidth="5"
      />

      {/* Extra sketch border */}
      <Path
        d="
            M125 10
            Q235 35 220 185
            Q120 260 30 185
            Q10 75 125 10
          "
        fill="none"
        stroke="#FFC107"
        strokeWidth="2"
        opacity="0.7"
      />

      {/* Another sketch line */}
      <Path
        d="
            M135 15
            Q225 45 215 175
            Q125 245 45 175
            Q25 85 135 15
          "
        fill="none"
        stroke="#FFC107"
        strokeWidth="2"
        opacity="0.5"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({});

export default ProfilePhoto;
