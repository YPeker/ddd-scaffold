import { server } from './api/server'

async function init() {
  try {
    console.log("Starting Service....")
    server.listen(10000, () => {
      console.log('Express App Listening on Port 10000');
    });
    console.log("Started Service....")
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}

init();