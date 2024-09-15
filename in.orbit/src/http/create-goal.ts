interface postCreateGoal {
  title: string
  desiredWeeklyFrequency: number
}

export async function postCreateGoal({
  desiredWeeklyFrequency,
  title,
}: postCreateGoal) {
  await fetch('http://localhost:3333/goals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ desiredWeeklyFrequency, title }),
  })
}
