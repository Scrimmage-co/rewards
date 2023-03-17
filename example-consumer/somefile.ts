import Scrimmage from 'scrimmage-rewards';

Scrimmage.initRewarder({
  rewarderId: 1,
  privateKey: 'privateKey',
});

Scrimmage.user.getOne('')
  .then(result => console.log('Success', result))
  .catch(error => console.error('Error', error));
