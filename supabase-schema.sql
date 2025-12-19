-- Schema SQL dla Supabase
-- Skopiuj i wklej ten kod do SQL Editor w Supabase Dashboard

-- Tworzenie typu enum dla statusu zadania
CREATE TYPE todo_status AS ENUM ('to-do', 'in progress', 'done');

-- Tworzenie tabeli todos
CREATE TABLE todos (
  id BIGSERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  status todo_status NOT NULL DEFAULT 'to-do',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dodanie indeksu dla szybszego sortowania po dacie utworzenia
CREATE INDEX idx_todos_created_at ON todos(created_at DESC);

-- Funkcja automatycznego aktualizowania updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger do automatycznego aktualizowania updated_at
CREATE TRIGGER update_todos_updated_at
  BEFORE UPDATE ON todos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Włączenie Row Level Security (RLS)
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Polityka: Wszyscy mogą wszystko (możesz to zmienić na bardziej restrykcyjne zasady)
-- Dla prostoty, każdy może czytać, dodawać, aktualizować i usuwać todos
CREATE POLICY "Wszyscy mogą przeglądać todos"
  ON todos FOR SELECT
  USING (true);

CREATE POLICY "Wszyscy mogą dodawać todos"
  ON todos FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Wszyscy mogą aktualizować todos"
  ON todos FOR UPDATE
  USING (true);

CREATE POLICY "Wszyscy mogą usuwać todos"
  ON todos FOR DELETE
  USING (true);

-- Opcjonalnie: Dodaj przykładowe dane
-- INSERT INTO todos (text, status) VALUES
--   ('Pierwszy przykład zadania', 'to-do'),
--   ('Drugie przykład zadania', 'in progress'),
--   ('Trzecie przykład zadania', 'done');
