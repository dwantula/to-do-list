# Database Migrations

## How to apply migrations

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Copy the content of the migration file
4. Paste and execute it

## Migration: add_position_column.sql

This migration adds the `position` column to the `todos` table to enable drag & drop reordering functionality.

**What it does:**
- Adds a `position` INTEGER column to the `todos` table
- Sets initial positions for existing todos based on their creation date
- Creates an index on the position column for better performance
- Makes the position column NOT NULL

**Required:** Run this migration before using the drag & drop feature.
