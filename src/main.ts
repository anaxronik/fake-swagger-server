import { createFiles } from "./createJsonFiles";
import { deleteFilesAndFolders } from "./removeFiles";

const fileUrl: string = "https://petstore3.swagger.io/api/v3/openapi.json";

// downloadFile(fileUrl)
//   .then((data) => {
//     const json = JSON.parse(data);
//     console.log(json);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

deleteFilesAndFolders("./routes").then(() => {
  createFiles([
    {
      filePath: "./routes/my/123/GET.json",
      content: { test: "test" },
    },
    {
      filePath: "./routes/my1/123/POST.json",
      content: { test: "test" },
    },
    {
      filePath: "./routes/my2/123/PUT.json",
      content: { test: "test" },
    },
    {
      filePath: "./routes/my3/123/DELETE.json",
      content: { test: "test" },
    },
  ]);
});
