import { Dialog } from './components/ui/dialog'

import { CreateGoal } from './components/Dialog/create.goal'
import { Summary } from './components/summary'
// import { EmptyGoals } from './components/Dialog/empty-goals'

export function App() {
  return (
    <Dialog>
      {/* <EmptyGoals /> */}
      <Summary />
      <CreateGoal />
    </Dialog>
  )
}
