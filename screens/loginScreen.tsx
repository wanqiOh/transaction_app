import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';
import { COLORS, SHARED } from '../styles/sharedStyles';

const LoginScreen = ({ navigation }: any) => {
  const [authError, setAuthError] = useState<String>("");

  const handleAuthentication = async () => {
    try {
      // Check if the device has hardware that supports biometrics (FaceID, Fingerprint, etc.)
      const hasHardware = await LocalAuthentication.hasHardwareAsync();

      // Check if the device has enrolled biometric credentials
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        // Trigger biometric authentication prompt
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate with biometrics',
          fallbackLabel: 'Use PIN',
          disableDeviceFallback: false,
        });

        // Handle result from the biometric authentication
        if (result.success) {
          console.log('Authentication successful!');
          setAuthError('');
          navigation.navigate('Transaction History');
        } else {
          setAuthError('Authentication failed. Please try again.');
        }
      } else {
        setAuthError('Biometric authentication is not available or not configured.');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setAuthError('Error during authentication.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{
        paddingBottom: 16,
        paddingHorizontal: 16,
        width: '100%',
        alignItems: 'center'
      }}>
        <View style={SHARED.card}>
          <Button
            title="Authenticate with Biometrics"
            onPress={handleAuthentication}
            color={COLORS.primary} // Customize the button color
          />

          {authError && <Text style={[SHARED.value, { color: COLORS.danger, marginTop: 12 }]}>{authError}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;