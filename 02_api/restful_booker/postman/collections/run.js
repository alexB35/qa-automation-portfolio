const newman = require('newman');
const path = require('path');

const envFile = '/tmp/rfb_env.json';

const base = '02_api/restful_booker/postman';

function run(collection, environment) {
  return new Promise((resolve, reject) => {
    newman.run(
      {
        collection,
        environment,
        reporters: ['cli', 'allure'],
        reporter: {
          allure: {
            export: '02_api/restful_booker/outputs/allure-results'
          }
        },
        exportEnvironment: envFile,
        suppressExitCode: true
      },
      err => (err ? reject(err) : resolve())
    );
  });
}

(async () => {
  try {
    const envInitial = `${base}/environments/RFB_Environment.postman_environment.json`;

    const c1 = `${base}/collections/RFB-00_Prerequisites.postman_collection.json`;
    const c2 = `${base}/collections/RFB-01_Create_Booking.postman_collection.json`;
    const c3 = `${base}/collections/RFB-02_Retrieve_Booking.postman_collection.json`;
    const c4 = `${base}/collections/RFB-03_Update_Booking.postman_collection.json`;
    const c5 = `${base}/collections/RFB-04_Delete_Booking.postman_collection.json`;
    const c6 = `${base}/environments/RFB_Environment.postman_environment.json`;

    await run(c1, envInitial);
    await run(c2, envFile);
    await run(c3, envFile);
    await run(c4, envFile);
    await run(c5, envFile);
    await run(c6, envFile);

    console.log('✔ Restful-booker finished');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();