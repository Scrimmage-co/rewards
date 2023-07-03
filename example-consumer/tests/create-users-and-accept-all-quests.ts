import Scrimmage from '@scrimmage/rewards';

const init = () => {
  Scrimmage.initRewarder({
    privateKeys: [
      {
        alias: 'bets',
        value: 'rewarderKey'
      }
    ],
    apiServerEndpoint: 'https://',
  });
};

const getUserToken = async (userId: string) => {
  return Scrimmage.user.getUserToken(userId, ['bets']);
}

const getPlayerResources = async (userId: string, token: string) => {
  return Scrimmage.user.getResources(userId, token);
}

const acceptQuest = async (questId: number, token: string) => {
  return Scrimmage.user.acceptQuest(questId, token);
}

const getQuests = async (token: string) => {
  return Scrimmage.user.getQuests(token);
}


// Create N users, and accept all quests for them
(async () => {
  init()
  console.log('Create N users, and accept all quests for them');

  const userAmount = 1;
  let iterator = 1;
  const commonId = Math.floor(Math.random() * 1000);

  try {
    let id = commonId.toString() + '::' + iterator++;
    const token = await getUserToken(id);
    console.log(`Created player with ID: ${id}`);
    // TODO add new tokens to each user
    // TODO get all quests for user
    // const userQuests = await getQuests(token);
    await acceptQuest(73642 + 2, token); // Take the last quest id from the DB
  } catch (e) {
    console.log(e);
  }

})();

