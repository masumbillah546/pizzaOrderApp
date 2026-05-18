import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';


export const requestReadPhoneStatePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      {
        title: 'Read Phone State Permission',
        message: 'This app needs access to your phone state to retrieve the IMEI number.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    } else {
      console.log('Permission Denied', 'Cannot access phone state without permission.');
      return false
    }
  } catch (err) {
    console.warn(err);
  }
};

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'We need to access your area to give you better feeds.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('granted, You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const requestAudioPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Audio Permission',
          message: 'This app needs access to your microphone.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error requesting audio permission:', error);
      return false;
    }
  } else {
    // Handle permissions for other platforms if needed
    return true;
  }
};

export const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      return false;
    }
  } else {
    // Handle permissions for other platforms if needed
    return true;
  }
};


export const requestExternalStorageReadPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'External Storage Read Permission',
          message: 'This app needs access to your external storage to read files.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      console.log(granted)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error requesting external storage read permission:', error);
      return false;
    }
  } else {
    // Handle permissions for other platforms if needed
    return true;
  }
};


export const requestExternalStorageWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Permission',
          message: 'This app needs access to your external storage to save files.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error requesting external storage permission:', error);
      return false;
    }
  } else {
    // Handle permissions for other platforms if needed
    return true;
  }
};


export const requestVideoPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      return false;
    }
  } else {
    // Handle permissions for other platforms if needed
    return true;
  }
};


export const requestMediaLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
      {
        title: 'Media Location Permission',
        message: 'This app needs access to your media location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
      console.log('Media location permission granted.');
    } else {
      return false;
      console.log('Media location permission denied.');
    }
  } catch (error) {
    console.warn('Error requesting media location permission:', error);
  }
}

export const requestMediaImagePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      {
        title: 'Media Image Permission',
        message: 'This app needs access to your media image.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
      console.log('Media location permission granted.');
    } else {
      return false;
      console.log('Media location permission denied.');
    }
  } catch (error) {
    console.warn('Error requesting media image permission:', error);
  }
}


export const requestManageStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
      {
        title: "Manage External Storage Permission",
        message: "App needs access to manage your storage",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Manage External Storage permission granted");
      return true;
    } else {
      console.log("Manage External Storage permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};

export const requestPostNotificationsPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: "Post Notifications Permission",
        message: "App needs access to post notifications",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Post Notifications permission granted");
      return true;
    } else {
      console.log("Post Notifications permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};


export const checkLocationAndNotificationPermissions = async () => {
  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ];

    // Check permissions
    const granted = await PermissionsAndroid.requestMultiple(permissions);

    // Handle the permission statuses
    for (let permission in granted) {
      if (granted[permission] === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log(`${permission} granted`);
      } else if (granted[permission] === PermissionsAndroid.RESULTS.DENIED) {
        // console.log(`${permission} denied`);
      } else if (granted[permission] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        // console.log(`${permission} denied permanently`);
      }
    }
  } catch (error) {
    console.error('Error checking permissions:', error);
  }
};


export const checkAllMediaPermissions = async () => {
  try {
    // Initialize permissions array
    let permissions = [
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ];

    if (Platform.OS === 'android') {
      const androidVersion = Platform.Version;

      // Add permissions based on Android version
      if (androidVersion < 30) {
        permissions.push(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
      } else if (androidVersion >= 33) {
        permissions.push(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION
        );
      }
    }

    // Request permissions
    const granted = await PermissionsAndroid.requestMultiple(permissions);

    let allGranted = true; // Track if all permissions are granted

    // Handle the permission statuses
    for (let permission in granted) {
      if (granted[permission] === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(`${permission} granted`);
      } else if (granted[permission] === PermissionsAndroid.RESULTS.DENIED) {
        console.log(`${permission} denied`);
        allGranted = false;
      } else if (granted[permission] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log(`${permission} denied permanently`);
        allGranted = false;
      }
    }

    if (allGranted) {
      // Alert.alert("Permissions Granted", "All required permissions have been granted.");
      return true; // All permissions granted
    } else {
      Alert.alert(
        "Permissions Denied",
        "Some media permissions were denied. Please enable them in Settings.",
        [
          {
            text: "OK",
            onPress: () => {
              Linking.openSettings(); // Opens the app's settings page
            },
          },
        ]
      );
      return false; // Some permissions denied
    }
  } catch (error) {
    console.error('Error checking permissions:', error);
    return false;
  }
};

export const ALlPermissionSequence = async () => {
  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ...(Platform.Version > 33 ? [PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] : []),
      ...(Platform.Version < 30 ? [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] : []),
      ...(Platform.Version < 30 ? [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] : []),
      ...(Platform.Version > 29 ? [PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION] : []) ,
      ...(Platform.Version > 33 ? [PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] : []),
    ];

    const granted = await PermissionsAndroid.requestMultiple(permissions);

    const allPermissionsGranted = permissions.every(
      permission => granted[permission] === PermissionsAndroid.RESULTS.GRANTED
    );

    if (allPermissionsGranted) {
      console.log('All permissions granted.');
      return true;
    } else {
      console.log('Some permissions denied.');
      return false;
    }
  } catch (error) {
    console.warn('Error requesting permissions:', error);
  }
};
export const checkVideoPermission = async () => {
  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.CAMERA,
      ...(Platform.Version > 33 ? [PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] : []),
      ...(Platform.Version < 30 ? [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] : []),
      ...(Platform.Version < 30 ? [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] : []),
      ...(Platform.Version > 29 ? [PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION] : []) ,
    ];

    // Request permissions and check their status
    const granted = await PermissionsAndroid.requestMultiple(permissions);

    // Find any missing permissions
    const missingPermissions = permissions.filter(
      permission => granted[permission] === PermissionsAndroid.RESULTS.DENIED
    );

    if (missingPermissions.length > 0) {
      // Handle the case where some permissions were denied
      return false;
    }

    // find never again permission
    const deniedPermissions = permissions.filter(
      permission => granted[permission] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    );

    if (deniedPermissions.length > 0) {
      Alert.alert(
        "Permission Required",
        "You have denied some permission parmanantly! Please enable it in app settings.",
        [
          { text: "Go to Settings", onPress: () => Linking.openSettings() },
          { text: "Cancel", style: "cancel" }
        ]
      );
      return false;
    }
    return true;

  } catch (error) {
    console.warn('Error requesting permissions:', error);
  }
}

export const checkAudioPermission = async () => {
  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ...(Platform.Version < 30 ? [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] : []),
      ...(Platform.Version < 30 ? [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] : []),
      ...(Platform.Version > 29 ? [PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION] : []) ,
    ];

    // Request permissions and check their status
    const granted = await PermissionsAndroid.requestMultiple(permissions);

    // Find any missing permissions
    const missingPermissions = permissions.filter(
      permission => granted[permission] === PermissionsAndroid.RESULTS.DENIED
    );

    if (missingPermissions.length > 0) {
      // Handle the case where some permissions were denied
      return false;
    }

    // find never again permission
    const deniedPermissions = permissions.filter(
      permission => granted[permission] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    );

    if (deniedPermissions.length > 0) {
      Alert.alert(
        "Permission Required",
        "You have denied access to some permission parmanantly! Please enable it in app settings.",
        [
          { text: "Go to Settings", onPress: () => Linking.openSettings() },
          { text: "Cancel", style: "cancel" }
        ]
      );
      return false;
    }

    return true;

  } catch (error) {
    console.warn('Error requesting permissions:', error);
  }
}

export const checkImagePermission = async () => {
  try {
    const permissions = [
      ...(Platform.Version > 33 ? [PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] : []),
      ...(Platform.Version < 30 ? [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] : []),
      ...(Platform.Version < 30 ? [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] : []),
      ...(Platform.Version > 29 ? [PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION] : []) ,
    ];

    // Request permissions and check their status
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    // Find any missing permissions
    const missingPermissions = permissions.filter(
      permission => granted[permission] === PermissionsAndroid.RESULTS.DENIED
    );

    if (missingPermissions.length > 0) {
      // Handle the case where some permissions were denied
      return false;
    }

    // find never again permission
    const deniedPermissions = permissions.filter(
      permission => granted[permission] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    );

    if (deniedPermissions.length > 0) {
      Alert.alert(
        "Permission Required",
        "You have denied access to some permission parmanantly! Please enable it in app settings.",
        [
          { text: "Go to Settings", onPress: () => Linking.openSettings() },
          { text: "Cancel", style: "cancel" }
        ]
      );
      return false;
    }

    return true;

  } catch (error) {
    console.warn('Error requesting permissions:', error);
  }
}


// export const checkAllMediaPermissions = async () => {
//   try {
//     // Initialize permissions array
//     let permissions = [
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//     ];

//     if (Platform.OS === 'android') {
//       const androidVersion = Platform.Version;

//       // Add permissions based on Android version
//       if (androidVersion < 30) {
//         permissions.push(
//           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
//         );
//       } else if (androidVersion >= 33) {
//         permissions.push(
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
//           PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
//         );
//       }
//     }

//     // Request permissions
//     const granted = await PermissionsAndroid.requestMultiple(permissions);

//     // Handle the permission statuses
//     for (let permission in granted) {
//       if (granted[permission] === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log(`${permission} granted`);
//         return true;
//       } else if (granted[permission] === PermissionsAndroid.RESULTS.DENIED) {
//         console.log(`${permission} denied`);
//         return false;
//       } else if (granted[permission] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
//         console.log(`${permission} denied permanently`);
//         return false;
//       }
//     }
//   } catch (error) {
//     console.error('Error checking permissions:', error);
//   }
// };
