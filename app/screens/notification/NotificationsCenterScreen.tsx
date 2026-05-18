import React from 'react';
import {FeaturePlaceholder} from '@/components';

export default function NotificationsCenterScreen({navigation}: any) {
  return (
    <FeaturePlaceholder
      title="Notifications center is coming next"
      description="Proposal alerts, job updates, customer actions, and other system notifications will appear here. Technician admin messages are already available in the Messages tab."
      actionLabel="Open Messages"
      onPressAction={() =>
        navigation.navigate('BottomTabs', {
          screen: 'Messages',
        })
      }
    />
  );
}
