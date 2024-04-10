## Notes about Next.js integration

To integrate the Scrimmage SDK with a Next.js project, you can use the following code snippet:


1. Initiate the SDK in some root component
```javascript
import dynamic from "next/dynamic";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    require("@scrimmage/js-sdk").init({
        apiServerEndpoint: 'https://<partner>.apps.scrimmage.co/',
        refreshToken: async () => {
            return '';
        }
    });
  });
  
  ...
}


```

2. Create a Hook which you will be able to use everywhere in the system

```javascript
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
```

3. Use the hook in any component using Dynamic imports

```javascript
import dynamic from "next/dynamic";
import { useEffect } from "react";

const ScrimmageComponent = dynamic(() => import("./ScrimmageComponent"), {
  ssr: false,
});

export default function Home() {
    return (
        <main>
            <ScrimmageComponent />
        </main>
    );
}

export default RewardsPage;
```
