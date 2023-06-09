
import { firstValueFrom } from 'rxjs';
import axios from "axios";

const SECRET = "secret";
const BASE_URL = "https://nevada.apps.scrimmage.co/";
const WEB3_SERVICE_USER_ID_HEADER = "Scrimmage-User-ID";
import Scrimmage, {
  Bet,
  BetLeague,
  BetOutcome,
  BetSport,
  BetType,
  SingleBet,
  SingleBetType,
} from "@scrimmage/rewards";

const init = () => {
  Scrimmage.initRewarder({
    privateKeys: [
      {
        alias: 'betting',
        value: 'test',
      }
    ],
    apiServerEndpoint: 'https://nevada.apps.scrimmage.co',
  });
};

const getUserToken = async (userId: string) => {
  return Scrimmage.user.getUserToken(userId, ['betting']);
}

const levelUpPlayer = async (itemId: number, token: string) => {
  return Scrimmage.user.levelUp(itemId, token);
}

const getPlayerResources = async (userId: string, token: string) => {
  return Scrimmage.user.getResources(userId, token);
}

(async () => {
  init()
  const userAmount = 1000;
  let iterator = 1;
  const commonId = Math.floor(Math.random() * 1000);

  const interval = setInterval(async () => {
    if (iterator > userAmount) {
      clearInterval(interval);
      console.log('Done')
      setTimeout(async () => {
        console.log('Done 2')
      }, 1000000);
      return;
    }
    let id = commonId.toString() + '::' + iterator++;
    // Add random number to ID

    try {
      const token = await getUserToken(id);
      const resources = await getPlayerResources(id, token);
      console.log(`Created player with ID: ${id}`);
      await levelUpPlayer(resources.activeItem.id, token);
    } catch (e) {
      console.log(e);
    }
  }, 100);
})();