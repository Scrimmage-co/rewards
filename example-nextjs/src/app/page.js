"use client";
import dynamic from "next/dynamic";
import {useEffect} from "react";

const ScrimmageComponent = dynamic(() => import("./ScrimmageComponent"), {
  ssr: false,
});


export default function Home() {
  useEffect(() => {
    const scrimmageSdk = require("@scrimmage/js-sdk");

    scrimmageSdk.init({
      apiServerEndpoint: "https://coinflip.apps.scrimmage.co/",
      refreshToken: () => {
        // Replace this with your own user token generation logic
        return '';
      },
      onReady: async () => {
        const player = await scrimmageSdk.instance.api.player.get();
      }
    });
  }, []);

  return (
    <main>
      <div>
        <p>Get started by editing</p>
        <ScrimmageComponent />
      </div>
    </main>
  );
}