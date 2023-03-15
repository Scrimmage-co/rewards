import * as crypto from 'crypto';

export let REWARDER_ID = null;
export let PRIVATE_KEY = null;
export let BASE_URL = `https://scrimmage.onelink.me/1BGM?af_web_dp=https%3A%2F%2Frewards.scrimmage.co&af_xp=app&pid=Cross_sale&c=Direct%20Integration`; // Generated on appsflier dashboard

export type rewarderConfig = {
  sandbox: boolean;
}

export const initRewarder = (rewarderId: number, privateKey: string) => {
  REWARDER_ID = rewarderId;
  PRIVATE_KEY = privateKey;

  //TODO: verify rewarderID and private key by making call on backend
  console.log('Rewarder Initiated');
}

export const generateLoginLink = (userId: string) => {
  if (!isInitiated()) {
    throw new Error('Rewarder not initiated');
  }
  const signature = crypto.createHmac('sha256', PRIVATE_KEY).update(REWARDER_ID + userId).digest('hex')
  return `${BASE_URL}&rewarderId=${REWARDER_ID}&userId=${userId}&signature=${signature}`
}

const isInitiated = () => {
  return REWARDER_ID != null && PRIVATE_KEY != null
}