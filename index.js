const { start } = require("./src/app");


/* we have exported server due to tests.
 * some customization and initial config based on environment
 * could be implimented here.
*/

(

  async () => {
    await start();

    process.on("uncaughtException", (err) => {
      console.log(err);
      process.exit(1);
    })
  }
)();

