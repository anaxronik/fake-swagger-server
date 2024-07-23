import fs from "fs";
import path from "path";
import fsPromises from "fs/promises";

export type FilePath = string;
export type Content = object;

export type FileParams = {
  filePath: FilePath;
  content: Content;
};

/**
 * Создает JSON файл с заданным содержимым по указанному пути.
 * @param filePath Путь к файлу, который нужно создать.
 * @param content Объект, который будет преобразован в JSON и записан в файл.
 */
export function createJsonFile(
  filePath: FilePath,
  content: Content
): Promise<void> {
  return new Promise((resolve, reject) => {
    const dirPath = path.dirname(filePath);

    // Создаем директорию, если она не существует
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        return reject(err);
      }

      // Проверяем, существует ли файл
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          // Файл не существует, преобразуем содержимое в JSON и записываем в файл
          fs.writeFile(filePath, JSON.stringify(content, null, 2), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        } else {
          // Файл существует, перезаписываем его содержимое
          fs.writeFile(filePath, JSON.stringify(content, null, 2), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }
      });
    });
  });
}

export async function createFiles(fileParams: FileParams[]): Promise<void> {
  for (const fileParam of fileParams) {
    await createJsonFile(fileParam.filePath, fileParam.content);
  }
}
