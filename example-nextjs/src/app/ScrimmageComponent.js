"use client";
import {useEffect, useState} from "react";
import { instance as Scrimmage } from '@scrimmage/js-sdk';


const ScrimmageComponent = () => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
      Scrimmage.api.player.get().then((player) => {
        setPlayer(player);
      });
  }, []);

  return (
    <p>
        {player ? `Player Level: ${player.stats.level}` : "Loading..."}
    </p>
  );
}

export default ScrimmageComponent;
