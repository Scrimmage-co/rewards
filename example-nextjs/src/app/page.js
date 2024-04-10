"use client";
import dynamic from "next/dynamic";
import {useEffect} from "react";

const ScrimmageComponent = dynamic(() => import("./ScrimmageComponent"), {
  ssr: false,
});


export default function Home() {
    useEffect(() => {
        require("@scrimmage/js-sdk").init({
            apiServerEndpoint: 'https://coinflip.apps.scrimmage.co/',
            refreshToken: async () => {
                return '';
            },
            onReady: async () => {
                const player = await require("@scrimmage/js-sdk").instance.api.player.get();
                console.log(player);
            }
        });
    });
  return (
    <main>
      <div>
        <p>
          Get started by editing
        </p>
        <ScrimmageComponent />
      </div>
    </main>
  );
}
