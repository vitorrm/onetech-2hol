const GameData = require('./src/GameData');

const gitURL = process.env.ONETECH_PROCESS_GIT_URL || "https://github.com/jasonrohrer/OneLifeData7.git";
const gitPath = process.env.ONETECH_PROCESS_GIT_PATH || (__dirname + "/OneLifeData7");

const gameData = new GameData(__dirname, gitPath);

if (process.argv.includes('download')) {
  console.log("Downloading data...");
  gameData.download(gitURL);
} else {
  gameData.verifyDownloaded();
}

console.log("Importing objects...");
gameData.importObjects();
gameData.importCategories();
gameData.importTransitions();

console.log("Populating versions...");
gameData.populateVersions();

console.log("Calculating object depth...");
gameData.calculateObjectDepth();

console.log("Exporting objects...");
gameData.exportObjects();

console.log("Exporting versions...");
gameData.exportVersions();

if (process.argv.includes('sprites') || process.argv.includes('download')) {
  console.log("Converting sprite images...");
  gameData.convertSpriteImages();
  gameData.convertGroundImages();

  console.log("Processing sprites...");
  gameData.processSprites();
}

if (!process.argv.includes('dev')) {
  const mod = process.env.ONETECH_MOD_NAME ? "-mod" : "";
  console.log(`Copying static${mod}-dev to static${mod}...`);
  gameData.syncStaticDir();

  console.log("Generating sitemap...");
  gameData.generateSitemap();
}
