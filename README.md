# Protocol Services Support
Service for monitoring and providing uptime and health reporting. This will get you started on reporting tools for the protocol stack.


## How to start localy

```
npm install
npm run build
docker-compose build
docker-compose up -d
```

After starting up this will automatically connect to aries-guardianship agency. If you need to add any other sevice it should be done in `src/config/env.json`.