import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal(body: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      title: body.title,
      desiredWeeklyFrequency: body.desiredWeeklyFrequency,
    })
    .returning()

  const goal = result[0]

  return {
    goal,
  }
}
