const express = require('express');
const Scrimmage = require('@scrimmage/rewards')?.default;
const app = express();
const PORT = process.env.PORT || 2999;

Scrimmage.initRewarder({
    apiServerEndpoint: 'https://coinflip.apps.scrimmage.co/',
    privateKey: 'AY5hNpja5pEBy_UNTN0PBua0ZQAeJ3B9vRnY5P1TEzvKa-fNppFfNBqEAY0YULNuCUsRQokH',
    namespace: 'production',
}).then(() => {
    // GET endpoint
    app.get('/getusertoken', (req, res) => {
        // Example userToken, in a real scenario, this could be generated or retrieved from a database
        return Scrimmage.user.getUserToken('nanachi', ).then((userToken) => {
            res.json({ userToken });
        });
    });

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});


