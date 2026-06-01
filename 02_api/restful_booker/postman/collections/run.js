const newman = require('newman');
const path = require('path');
const allureExport = path.resolve(__dirname, '../../outputs/allure-results');
console.log('Allure export path:', allureExport);

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
            export: allureExport
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

    const collections = [
      { file: 'RFB-00_Prerequisites.postman_collection.json',    env: envInitial },
      { file: 'RFB-01_Create_Booking.postman_collection.json',   env: envFile },
      { file: 'RFB-02_Retrieve_Booking.postman_collection.json', env: envFile },
      { file: 'RFB-03_Update_Booking.postman_collection.json',   env: envFile },
      { file: 'RFB-04_Delete_Booking.postman_collection.json',   env: envFile },
    ];

    for (const { file, env } of collections) {
      await run(`${base}/collections/${file}`, env);
    }

    console.log('✔ Restful-booker finished');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();