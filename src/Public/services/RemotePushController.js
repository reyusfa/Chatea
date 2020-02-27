import { useEffect } from 'react';
import { FCM_SENDER_ID } from 'react-native-dotenv';
import PushNotification from 'react-native-push-notification';

const RemotePushController = () => {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification);

        // process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: FCM_SENDER_ID,
      popInitialNotification: true,
      requestPermissions: true
    });
  }, []);

  return null;
};

export default RemotePushController;
