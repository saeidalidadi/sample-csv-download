//const mockUsers = require("./mock");
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");
const ProgressBar = require('cli-progress');
const dbClient = require("../src/db");
const { generateUser } = require("./helpers");
const UserModel = require("../src/model").User;


/* Create workers of threads for fast write to mongodb
 * workers = 4
 */

const start = async (progress) => {

  if (isMainThread) {
    const totalDocumentsCount = 1000000;
    const workersCount = 4;
    const workerDocumentsCount = totalDocumentsCount / workersCount;

    progress.start(totalDocumentsCount, 0);

    const data = {
      workerData:
      {
        documetsCount: workerDocumentsCount
      }
    };

    for (let i = 0; i < workersCount; i++) {
      const mockWorker = new Worker(__filename, data);
      mockWorker.on("message", (count) => {
        progress.increment();
      })
    }
  } else {
    const db = await dbClient.connect();
    const createUsers = async () => {
      try {
        const user = generateUser();
        await UserModel.create(user);
      } catch (err) {
        console.log(err);
        throw new Error("User did not saved due to database error.")
      }
    }

    // Count users have been inserted to db
    let counter = 0;

    // users document count
    let max = workerData.documetsCount;

    while (counter < max) {
      await createUsers();
      counter++;
      parentPort.postMessage(1);
    };

    db.close()
  }
}

// show insertion progress 
const progress = new ProgressBar.SingleBar(
  {
    barsize: 60,
    format: "{bar} {percentage}% | {value}/{total}"
  }, ProgressBar.Presets.shades_classic
);

start(progress)