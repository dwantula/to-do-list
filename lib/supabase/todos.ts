import { createClient } from './client'
import { Database, TodoStatus } from '@/types/supabase'

type Todo = Database['public']['Tables']['todos']['Row']

export async function getTodos() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching todos:', error)
    throw error
  }

  return data as Todo[]
}

export async function addTodo(text: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('todos')
    .insert({ text, status: 'to-do' })
    .select()
    .single()

  if (error) {
    console.error('Error adding todo:', error)
    throw error
  }

  return data as Todo
}

export async function updateTodoStatus(id: number, status: TodoStatus) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('todos')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating todo:', error)
    throw error
  }

  return data as Todo
}

export async function deleteTodo(id: number) {
  const supabase = createClient()

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting todo:', error)
    throw error
  }

  return true
}
