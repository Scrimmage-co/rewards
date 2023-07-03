
# Usage

1. First do npm install for example-consumer and rewards-library
```  
npm install
```

2. Mount the lib
```
"linklib": "npm run --prefix ../rewards-library build && npm link ../rewards-library",
```


3. Setup the rewards lib
```  
  Scrimmage.initRewarder({
    privateKeys: [
      {
        alias: 'bets',
        value: '[Rewarable key]'
      }
    ],
    apiServerEndpoint: 'https://...',
  });
```  

4. alias: 'bets' from initRewarder has to equal the Scrimmage.user.getUserToken(userId, ['bets']);