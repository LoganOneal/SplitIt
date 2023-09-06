import 'dotenv/config';

export default {
  expo: {
    name: 'Expo Firebase Starter',
    slug: 'expo-firebase',
    privacy: 'public',
    platforms: ['ios', 'android'],
    version: '0.15.0',
    orientation: 'portrait',
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      "bundleIdentifier": "com.loganoneal.splitit",
      infoPlist: {
        NSCameraUsageDescription: "This app uses the camera to do something",
        NSPhotoLibraryUsageDescription: "This app accesses the library to do something"
     }
    },
    android: {
      package: "com.loganoneal.splitit"
    },  
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      eas: {
        projectId: "f8f76a0c-b66e-4ee4-969d-77e8650baede"
      }
    }
  }
};
