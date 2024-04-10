## Notes about Next.js integration

To integrate the Scrimmage SDK with a Next.js project, you can use the following code snippet:

```javascript
    useEffect(() => {
    require("@scrimmage/js-sdk").init({
        apiServerEndpoint: 'https://<partner>.apps.scrimmage.co/',
        refreshToken: async () => {
            return '';
        },
        onReady: async () => {
            const player = await require("@scrimmage/js-sdk").instance.api.player.get();
            console.log(player);
        }
    });
});

```

Inside of the onReady function, you can call any of the SDK methods. For example, to get the player's information, you can call the player.get() method.