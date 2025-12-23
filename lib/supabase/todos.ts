import { createClient } from './client'
import { Database, TodoStatus } from '@/types/supabase'

type Todo = Database['public']['Tables']['todos']['Row']

export async function getTodos() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('position', { ascending: true })

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

export async function updateTodoText(id: number, text: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('todos')
    .update({ text })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating todo text:', error)
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

export async function updateTodoPosition(id: number, position: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('todos')
    .update({ position })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating todo position:', error)
    throw error
  }

  return data as Todo
}

export async function reorderTodos(todos: { id: number; position: number }[]) {
  const supabase = createClient()

  const updates = todos.map(({ id, position }) =>
    supabase
      .from('todos')
      .update({ position })
      .eq('id', id)
  )

  const results = await Promise.all(updates)

  const errors = results.filter(result => result.error)
  if (errors.length > 0) {
    console.error('Error reordering todos:', errors)
    throw new Error('Failed to reorder todos')
  }

  return true
}
