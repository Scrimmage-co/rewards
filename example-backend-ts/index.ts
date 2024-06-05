const express = require('express');
import Scrimmage from '@scrimmage/rewards';
const app = express();
const PORT = process.env.PORT || 2999;

Scrimmage.initRewarder({
    apiServerEndpoint: 'https://coinflip.apps.scrimmage.co/',
    privateKey: '',
    namespace: 'production',
}).then(() => {
    app.get('/getusertoken', (req, res) => {
        // Example userToken, in a real scenario, this could be generated or retrieved from a database
        return Scrimmage.user.getUserToken('nanachi', ).then((userToken) => {
            res.json({ userToken });
        });
    });

    app.get('/reward', (req, res) => {
        return Scrimmage.reward.trackRewardable<any>('nanachi', 'helloWorld', {
            amount: 10,
            currency: 'USD',
        }).then((result) => {
            res.json(result);
        });
    });

    app.get('/inplace/reward', async (req, res) => {
        const scrimmage = await Scrimmage.createRewarder({
            apiServerEndpoint: 'https://coinflip.apps.scrimmage.co/',
            privateKey: '',
            namespace: 'staging',
        });
        return scrimmage.reward.trackRewardable<any>('nanachi', 'helloWorld', {
            amount: 100,
            currency: 'USD2',
        }).then((result) => {
            res.json(result);
        });
    });

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});


