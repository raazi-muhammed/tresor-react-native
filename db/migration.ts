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
    if (currentDbVersion === 0) {
        await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS documents (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, caption TEXT, imageFront TEXT NOT NULL, imageBack TEXT);
`);
        currentDbVersion = 1;
    }
    // if (currentDbVersion === 1) {
    //   Add more migrations
    // }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
