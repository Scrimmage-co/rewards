import Config from './config';

type WidgetType = 'banner1' | 'banner2' | 'banner3' | 'banner4';

const getWidget = (
  userId: string,
  averageEarningPerDay: number,
  type: WidgetType,
) => {
  const config = Config.getConfigOrThrow();

  return `${config.imgUrl}/widget?userId=${userId}&monthlyEarning=${Math.round(
    averageEarningPerDay,
  )}&size=${type}&publicKey=${config.rewarderId}`;
};

const Promotion = {
  getWidget,
};

export default Promotion;
