# Rewards.ts

The low-code loyalty program maker. 

This library is a part of the [Scrimmage Rewards Program](https://scrimmage.co)
that is providing a solution for loyalty programs and rewards.

Tutorial can be found at [Scrimmage Rewards Tutorial](https://scrimmage-rewards.readme.io/docs).

## Installation

1. Install the library
   ```shell  
   npm install @scrimmage/rewards
   ```
   or
   ```shell
   yarn add @scrimmage/rewards
   ```

## Usage on the backend

1. Import the library in CommonJS:
   ```javascript
   const Scrimmage = require('@scrimmage/rewards');
   ```
   or in ES6:
   ```typescript
   import Scrimmage from '@scrimmage/rewards';
   ```
   
2. Initialize the library for global usage
   ```typescript
   Scrimmage.initRewarder({
     apiServerEndpoint: '<your api server endpoint>',
     privateKey: '<your private key>',
     namespace: '<environment, e.g. staging or production>',   
   });
   ```

3. Use the library
   ```typescript
   await Scrimmage.reward.trackRewardable(
     'unique-user-id',
     'Data Type Name',
     {
       'custom-property': 'custom-value',
       'custom-property-2': {
          'custom-property-2-1': 'custom-value-2-1',
       },
     },
   );
   ```

   For one-time events you can use `trackRewardableOnce` method. Make sure to use unique event id.

   ```typescript
    await Scrimmage.reward.trackRewardableOnce(
      'unique-user-id',
      'Data Type Name',
      'unique-event-id',
      {
         'custom-property': 'custom-value',
         'custom-property-2': {
             'custom-property-2-1': 'custom-value-2-1',
         },
      },
    );
    ```

4. Get user token
   ```typescript
   const token = await Scrimmage.user.getUserToken('unique-user-id');
   ```
   or
   ```typescript
   const token = await Scrimmage.user.getUserToken('unique-user-id', {
      tags: ['tag1', 'tag2'],
      properties: {
         'custom-property': 'custom-value',
         'custom-property-2': 12345,
      },
   });
   ```
   
   Use this token to identify the user on the frontend. Make sure to deliver the token to the frontend securely.

## Multiple connections

If you want to use multiple connections, you need to create a new instance of the library.

```typescript
const rewarderForProduction = Scrimmage.createRewarder({
  apiServer: '<your api server endpoint 1>',
  privateKey: '<your private key 1>',
  namespace: '<environment 1, e.g. staging or production>',
});

const rewarderForStaging = Scrimmage.createRewarder({
  apiServer: '<your api server endpoint 2>',
  privateKey: '<your private key 2>',
  namespace: '<environment 2, e.g. staging or production>',
});
```

Then you can use the two instances simultaneously.

```typescript
await rewarderForProduction.reward.trackRewardable(
  'unique-user-id',
  'Data Type Name',
  {
    'custom-property': 'custom-value',
    'custom-property-2': {
      'custom-property-2-1': 'custom-value-2-1',
    },
  },
);

await rewarderForStaging.reward.trackRewardable(
  'unique-user-id',
  'Data Type Name',
  {
    'custom-property': 'custom-value',
    'custom-property-2': {
      'custom-property-2-1': 'custom-value-2-1',
    },
  },
);
```

## Usage on the frontend

- Using `<iframe />`: [github.com/Scrimmage-co/scrimmage-rewards-iframe](https://github.com/Scrimmage-co/scrimmage-rewards-iframe)
- Using Android: [github.com/Scrimmage-co/scrimmage-rewards-android](https://github.com/Scrimmage-co/scrimmage-rewards-android)
- Using iOS: [github.com/Scrimmage-co/scrimmage-rewards-ios](https://github.com/Scrimmage-co/scrimmage-rewards-ios)
- Using Flutter: [github.com/Scrimmage-co/scrimmage-rewards-flutter](https://github.com/Scrimmage-co/scrimmage-rewards-flutter)
