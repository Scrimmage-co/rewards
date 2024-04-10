## Notes about Next.js integration

To integrate the Scrimmage SDK with a Next.js project, you can use the following code snippet:


1. Initiate the SDK in some root component
```javascript
import dynamic from "next/dynamic";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.scrimmage = require("@scrimmage/js-sdk");
    window.scrimmage.init({
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
import {create} from '@scrimmage/js-sdk';
import {useEffect} from "react";

const useScrimmage = () => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
      window.scrimmage.api.player.get().then((player) => {
          setPlayer(player);
      });
  }, []);

  return (
    player
  );
}

export default useScrimmage;
```

3. Use the hook in any component using Dynamic imports

```javascript
import dynamic from "next/dynamic";
import { useEffect } from "react";

const useScrimmage = dynamic(() => import("./ScrimmageComponent"), {
  ssr: false,
});

function RewardsPage() {
    const { player } = useScrimmage();
    
    ...
}

export default RewardsPage;
```
