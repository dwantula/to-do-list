-- Migration: Add position column to todos table
-- This migration adds a position column to track the order of tasks for drag & drop functionality

-- Add position column with default value
ALTER TABLE todos
ADD COLUMN IF NOT EXISTS position INTEGER DEFAULT 0;

-- Update existing rows to have sequential positions based on created_at
WITH ranked_todos AS (
  SELECT
    id,
    ROW_NUMBER() OVER (ORDER BY created_at DESC) - 1 AS new_position
  FROM todos
)
UPDATE todos
SET position = ranked_todos.new_position
FROM ranked_todos
WHERE todos.id = ranked_todos.id;

-- Make position NOT NULL after setting values
ALTER TABLE todos
ALTER COLUMN position SET NOT NULL;

-- Create index on position for better query performance
CREATE INDEX IF NOT EXISTS idx_todos_position ON todos(position);

-- Update the RLS policies if needed (they should still work as-is)
