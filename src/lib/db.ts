import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "cards.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS cards (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        title TEXT DEFAULT '',
        company TEXT DEFAULT '',
        email TEXT DEFAULT '',
        phone TEXT DEFAULT '',
        website TEXT DEFAULT '',
        address TEXT DEFAULT '',
        bio TEXT DEFAULT '',
        photo_url TEXT DEFAULT '',
        linkedin TEXT DEFAULT '',
        twitter TEXT DEFAULT '',
        primary_color TEXT DEFAULT '#1a1a2e',
        secondary_color TEXT DEFAULT '#16213e',
        accent_color TEXT DEFAULT '#0f3460',
        text_color TEXT DEFAULT '#ffffff',
        font_family TEXT DEFAULT 'Inter, sans-serif',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );
    `);
  }
  return db;
}

export interface Card {
  id: string;
  slug: string;
  first_name: string;
  last_name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  bio: string;
  photo_url: string;
  linkedin: string;
  twitter: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  text_color: string;
  font_family: string;
  created_at: string;
  updated_at: string;
}

export function getAllCards(): Card[] {
  const db = getDb();
  return db.prepare("SELECT * FROM cards ORDER BY created_at DESC").all() as Card[];
}

export function getCardById(id: string): Card | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM cards WHERE id = ?").get(id) as Card | undefined;
}

export function getCardBySlug(slug: string): Card | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM cards WHERE slug = ?").get(slug) as Card | undefined;
}

export function createCard(card: Omit<Card, "created_at" | "updated_at">): Card {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO cards (id, slug, first_name, last_name, title, company, email, phone, website, address, bio, photo_url, linkedin, twitter, primary_color, secondary_color, accent_color, text_color, font_family)
    VALUES (@id, @slug, @first_name, @last_name, @title, @company, @email, @phone, @website, @address, @bio, @photo_url, @linkedin, @twitter, @primary_color, @secondary_color, @accent_color, @text_color, @font_family)
  `);
  stmt.run(card);
  return getCardById(card.id) as Card;
}

const ALLOWED_COLUMNS = new Set([
  "slug", "first_name", "last_name", "title", "company", "email", "phone",
  "website", "address", "bio", "photo_url", "linkedin", "twitter",
  "primary_color", "secondary_color", "accent_color", "text_color", "font_family",
]);

export function updateCard(id: string, updates: Partial<Omit<Card, "id" | "created_at" | "updated_at">>): Card | undefined {
  const db = getDb();
  const safeUpdates: Record<string, unknown> = {};
  for (const key of Object.keys(updates)) {
    if (ALLOWED_COLUMNS.has(key)) {
      safeUpdates[key] = (updates as Record<string, unknown>)[key];
    }
  }
  const fields = Object.keys(safeUpdates)
    .map((key) => `${key} = @${key}`)
    .join(", ");
  if (!fields) return getCardById(id);
  const stmt = db.prepare(`UPDATE cards SET ${fields}, updated_at = datetime('now') WHERE id = @id`);
  stmt.run({ ...safeUpdates, id });
  return getCardById(id);
}

export function deleteCard(id: string): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM cards WHERE id = ?").run(id);
  return result.changes > 0;
}
