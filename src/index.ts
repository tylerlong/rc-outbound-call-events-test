import RingCentral from '@rc-ex/core';
import WebSocketExtension from '@rc-ex/ws';

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const main = async () => {
  await rc.authorize({ jwt: process.env.RINGCENTRAL_JWT_TOKEN! });
  const wsExtension = new WebSocketExtension();
  await rc.installExtension(wsExtension);
  await wsExtension.subscribe(
    [
      '/restapi/v1.0/account/~/extension/~/telephony/sessions?sipData=true',
      '/restapi/v1.0/account/~/extension/~/presence?detailedTelephonyState=true',
    ],
    (event) => {
      console.log(JSON.stringify(event, null, 2));
    },
  );
};
main();
