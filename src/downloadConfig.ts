import * as https from "https";

export const downloadFile = (fileUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    https
      .get(fileUrl, (response) => {
        if (response.statusCode === 200) {
          let data = "";
          response.on("data", (chunk) => {
            data += chunk;
          });
          response.on("end", () => {
            resolve(data);
          });
        } else {
          reject(`Failed to download file`);
        }
      })
      .on("error", (error: Error) => {
        reject(`Error: ${error.message}`);
      });
  });
};
