import { CheckCircle2, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'

import iconInOrbit from '../assets/icon-in-orbit.svg'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { OutlineButton } from './ui/outline-button'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from '../http/get-summary'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-BR'

dayjs.locale(ptBr)

export function Summary() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
  })

  if (!data) {
    return null
  }

  const firstDayOnWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOnWeek = dayjs().endOf('week').format('D MMM')

  const completedPercentage = Math.round((data.completed * 100) / data.total)
  console.log(data.goalsPerDay)

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 ">
          <img src={iconInOrbit} alt="" />
          <span className="text-lg font-semibold capitalize">
            {firstDayOnWeek} a {lastDayOnWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={data.completed} max={data.total}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{data?.completed}</span> de{' '}
            <span className="text-zinc-100">{data?.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>
      <Separator />

      <div className="flex flex-wrap gap-3 overflow-ellipsis">
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Meditar
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Praticar exercício
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Nadar
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Me alimentar
        </OutlineButton>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {Object.entries(data.goalsPerDay).map(([date, goals]) => {
          const weekDay = dayjs(date).format('dddd')
          const formattedDate = dayjs(date).format('D [de] MMMM')
          console.log(goals)
          return (
            <div key={date} className="flex flex-col gap-4">
              <h3 className="font-medium">
                <span className="capitalize">{weekDay} </span>
                <span className="text-zinc-400 text-xs">({formattedDate})</span>
              </h3>

              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-pink-500" />
                  <span className="text-sm text-zinc-400">
                    Você completou "
                    <span className="to-zinc-100">Acordar cedo</span>" ás{' '}
                    <span className="to-zinc-100">08:13h</span>
                  </span>
                </li>
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
