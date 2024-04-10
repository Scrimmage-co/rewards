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
                return 'eyJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiVVNFUl9BQ0NFU1MiLCJucyI6ImNvbW11bml0eSIsImlhdCI6MTcxMjc2MjcwNSwibmJmIjoxNzEyNzYyNzA1LCJpc3MiOiJsZiIsInN1YiI6Im5hbmFjaGkiLCJleHAiOjE3MTMwMjE5MDUsImF1ZCI6W119.DFPlV7k8BIylaH71TMJOri3CF-TIhp8bYVQ0_SNoj0cmlR0u_thv5B5gxcr9sezb1qLJZ3s5tCAZyYXQk4LIsVZdHwXXgu57njr9CmWXuYnOyCP3H-Q8UMwxD7fVflmOf8dqT8vWwrgd8-0X0yNX2-T6j48ktojrsp0s9VhwmhLYbzLatzKD9hqOVed_TLqSsj8eoatNcPlzUfsflsZXaehFHIXmPeWnQ6WcMw6FUAVgJ1S5Kq8Afwxa5r3qFJgNBKYE_oa-5OL_P84WmbFJ0eEV1_0Ygbe1jYmDK7t1HHbeG3vOp0lFC62Do_SeCbu01j3Il0bDt0yjNke5qAmhOw';
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
