import { Capacitor } from "@capacitor/core"
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite"

const sqlite = new SQLiteConnection(CapacitorSQLite)

let db: SQLiteDBConnection | null = null

export const getDB = async (): Promise<SQLiteDBConnection | null> => {
  if (!Capacitor.isNativePlatform()) return null

  if (db) return db

  db = await sqlite.createConnection("appDB", false, "no-encryption", 1, false)
  await db.open()

  await db.execute(`
    CREATE TABLE IF NOT EXISTS storage (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `)

  return db
}