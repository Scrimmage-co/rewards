"use client";
import {useEffect, useState} from "react";
import { instance as Scrimmage } from '@scrimmage/js-sdk';
import { getRequirementsProgress} from "@scrimmage/ui-toolkit";


const ScrimmageComponent = () => {
  const [player, setPlayer] = useState(null);
  const [playerProgress, setPlayerProgress] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
      const interval = setInterval(async () => {
          console.log("Scrimmage status", Scrimmage?.isInitialized());
        if (Scrimmage?.isInitialized()) {
            console.log("Scrimmage is initialized");
            setIsInitialized(true);
            clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
  }, []);

    useEffect(() => {
        console.log("Scrimmage is initialized", isInitialized);
        if (isInitialized) {
            Scrimmage.api.player.get().then(async (player) => {
                console.log(player);
                setPlayer(player);

                const levelUpRequirements = player.levelConfig?.levelUpRequirements ?? [];
                const userProperties = player.properties ?? [];
                const playerProgress = getRequirementsProgress(levelUpRequirements,userProperties);
                console.log(playerProgress);
                setPlayerProgress(playerProgress);
            });
        }
    }, [isInitialized]);

  return (
    <p>
        {player ? `Player Level: ${player.stats.level}` : "Loading..."}
        <br />
        {playerProgress ? `Player Progress: ${playerProgress?.totalProgress} / 100. Can he level up? ${playerProgress?.canLevelUp}` : "Loading..."}
    </p>
  );
}

export default ScrimmageComponent;
