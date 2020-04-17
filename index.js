const { start } = require("./src/app");


/* we have exported server due to tests.
 * some customization and initial config based on environment
 * could be implimented here.
*/

(

  async () => await start()

)();

