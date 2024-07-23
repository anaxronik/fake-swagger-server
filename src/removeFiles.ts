import fs from "fs/promises";
import path from "path";

export async function deleteFilesAndFolders(
  directoryPath: string
): Promise<void> {
  const entries = await fs.readdir(directoryPath, {
    withFileTypes: true,
  });
  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) {
        await deleteFilesAndFolders(fullPath);
      } else {
        await fs.unlink(fullPath);
      }
    })
  );
  await fs.rmdir(directoryPath);
}
