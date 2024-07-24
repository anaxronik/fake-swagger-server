import example from "../example.json";
import { createFiles } from "./createJsonFiles";
import { readSwaggerConfig } from "./readSwaggerConfig";
import { deleteFilesAndFolders } from "./removeFiles";

example;

const files = readSwaggerConfig(example as any);
console.log(files);

const fileUrl: string = "https://petstore3.swagger.io/api/v3/openapi.json";

// downloadFile(fileUrl)
//   .then((data) => {
//     const json = JSON.parse(data);
//     console.log(json);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

const FOLDER_NAME = "./routes";

deleteFilesAndFolders("./routes").then(() => {
  createFiles(
    files.map((f) => ({
      ...f,
      filePath: `${FOLDER_NAME}/${f.filePath}`,
    }))
  );
});
