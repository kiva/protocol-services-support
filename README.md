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

You will then be able to curl the following command:

```
curl http://localhost:3022/v2/stats/report
```
And some of the sample output will look like this:

### If the service fails
```
{"reportingServices":[{"serviceName":"protocol-services-support","startedAt":"Thu Jun 02 2022","currentTime":"Thu Jun 02 2022"}],"failedServices":["localhost:3010"],"reportDate":"Thu Jun 02 2022"}
```