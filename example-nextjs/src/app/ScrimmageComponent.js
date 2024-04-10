"use client";
import {useEffect, useState} from "react";
import { instance as Scrimmage } from '@scrimmage/js-sdk';


const ScrimmageComponent = () => {
  const [player, setPlayer] = useState(null);
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
            Scrimmage.api.player.get().then((player) => {
                console.log(player);
                setPlayer(player);
            });
        }
    }, [isInitialized]);

  return (
    <p>
        {player ? `Player Level: ${player.properties['$.level']}` : "Loading..."}
    </p>
  );
}

export default ScrimmageComponent;
