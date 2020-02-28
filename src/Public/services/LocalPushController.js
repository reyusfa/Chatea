import { useEffect, useCallback, useState } from 'react';
import PushNotification from 'react-native-push-notification';
import { firebaseDatabase } from '../../Public/config/firebase';

PushNotification.configure({
  onNotification: function(notification) {
    // console.log('LOCAL NOTIFICATION: ', notification);
  },
  popInitialNotification: true,
  requestPermissions: true
});

const LocalNotification = ({ bigText, subText, title, message }) => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText: bigText || '',
    subText: subText || '',
    title: title || '',
    message: message || '',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default'
  });
};

const NotificationsListener = ({ userId }) => {
  // const [notification, setNotification] = useState({});
  const notifRef = firebaseDatabase
    .ref()
    .child('notifications')
    .child(userId);

  const getNotifications = useCallback(() => {
    notifRef
      .orderByChild('delivered')
      .equalTo(false)
      .on('child_added', snap => {
        LocalNotification({
          bigText: snap.val().receiverDisplayName,
          subText: snap.val().receiverDisplayName,
          title: snap.val().receiverDisplayName,
          message: snap.val().content.text
        });
        notifRef
          .child(snap.val()._id)
          .child('delivered')
          .set(true);
        // console.log(snap.val());

        // setNotification(snap.val().content);
      });
  }, [notifRef]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return null;
};

export { LocalNotification, NotificationsListener };
