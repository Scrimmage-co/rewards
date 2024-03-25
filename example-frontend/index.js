import {create} from "@scrimmage/js-sdk";

const scrimmage = create({
    apiServerEndpoint: "https://coinflip.apps.scrimmage.co/",
    refreshToken: () => {
        return fetch("http://localhost:2999/getusertoken").then((res) => res.json()).then((json) => json.userToken);
    }
});

scrimmage.api.player.get().then((player) => {
    console.log("player", player);
    const playerProgress = scrimmage.api.player.getLevelProgress(player)
    console.log("playerProgress", playerProgress.totalProgress, playerProgress.levelRequirementProgresses);
    scrimmage.api.gameRules.getAll().then((gameRules) => {
        console.log("gameRules", gameRules);

        for (const gameRule of gameRules) {
            const isUserQualified = scrimmage.api.gameRules.isUserQualified(player, gameRule);
            console.log(`isUserQualified for ${gameRule.description}: ${isUserQualified}`);
        }
    });
});

scrimmage.api.websocketUpdates.subscribeOnGameEvents((gameEvents) => {
    console.log("gameEvents", gameEvents);
});

scrimmage.api.websocketUpdates.subscribeOnRefreshEvents((refreshEvents) => {
    console.log("refreshEvents", refreshEvents);
});
