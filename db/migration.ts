import { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    let currentDbVersion =
        (
            await db.getFirstAsync<{
                user_version: number;
            }>("PRAGMA user_version")
        )?.user_version || 0;

    if (currentDbVersion >= DATABASE_VERSION) {
        return;
    }
    //if (currentDbVersion === 0) {
    if (true) {
        await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY NOT NULL, 
    title TEXT NOT NULL, 
    caption TEXT
  );
CREATE TABLE IF NOT EXISTS images (
    image_id INTEGER PRIMARY KEY NOT NULL, 
    document_id INTEGER NOT NULL, 
    uri TEXT NOT NULL, 
    height INTEGER NOT NULL, 
    width INTEGER NOT NULL,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
  );
CREATE TABLE IF NOT EXISTS fields (
    field_id INTEGER PRIMARY KEY NOT NULL, 
    document_id INTEGER NOT NULL, 
    key TEXT NOT NULL, 
    value TEXT NOT NULL, 
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
  );
`);
        currentDbVersion = 1;
    }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
