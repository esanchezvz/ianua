'use client'

import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useMeasure } from 'react-use'

import { Button } from '@/components/ui/button'
import { usePrevious } from '@/hooks/use-previous'

export default function Profiler() {
  return (
    <main className="flex h-full">
      <div className="hidden h-full grow flex-col items-center justify-center bg-blue text-white md:flex">
        mobile hidden (Poner alguna imagen o algo)
      </div>
      <div className="flex h-full grow flex-col items-center justify-center bg-white p-10 md:w-[50%]">
        <ProfilerCarousel />
      </div>
    </main>
  )
}

const ProfilerCarousel = () => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const prev = usePrevious(step)
  const [ref, { width }] = useMeasure<HTMLDivElement>()

  const direction = prev && step > prev ? 1 : -1

  const handleNext = () => {
    if (step < 10) {
      setStep(step + 1)
      return
    }

    router.push('/propiedades')
  }

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1)
      return
    }
  }

  return (
    <>
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden" ref={ref}>
        <AnimatePresence custom={{ direction, width }}>
          <motion.div
            key={step}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={{ direction, width }}
            transition={{ bounce: 0 }}
            className="absolute flex flex-col items-center justify-center"
          >
            {step}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex w-full items-center justify-between">
        <Button variant="ghost" onClick={handlePrev} disabled={step === 1}>
          Atrás
        </Button>
        <Button onClick={handleNext}>{step === 10 ? 'Buscar Propiedades' : 'Siguiente'}</Button>
      </div>
    </>
  )
}

const variants = {
  initial: ({ direction, width }: { direction: number; width: number }) => ({ x: width * direction }),
  animate: { x: 0 },
  exit: ({ direction, width }: { direction: number; width: number }) => ({ x: -width * direction }),
}
