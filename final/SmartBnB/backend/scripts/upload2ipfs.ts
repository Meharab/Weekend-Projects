import { ThirdwebStorage } from "@thirdweb-dev/storage";
import fs from "fs";

const storage = new ThirdwebStorage();

(async () => {
  const image = process.argv[2];
  let upload = await storage.upload(
    fs.readFileSync(image),
    { uploadWithoutDirectory: true }
  );
  upload = upload.slice(7) // remove "ipfs://"
  console.log(`CID: ${upload}`);
})();
