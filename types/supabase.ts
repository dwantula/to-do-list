export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type TodoStatus = 'to-do' | 'in progress' | 'done'

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          id: number
          text: string
          status: TodoStatus
          position: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          text: string
          status?: TodoStatus
          position?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: never
          text?: string
          status?: TodoStatus
          position?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      // Dodaj tutaj swoje widoki
    }
    Functions: {
      // Dodaj tutaj swoje funkcje
    }
    Enums: {
      todo_status: TodoStatus
    }
  }
}
