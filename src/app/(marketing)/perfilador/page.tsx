'use client'

import { useState } from 'react'

import { PropertyType } from '@prisma/client'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useMeasure } from 'react-use'

import { PachonMessage } from '@/components/shared/pachon-message'
import { Button } from '@/components/ui/button'
import { NumberField } from '@/components/ui/number-field'
import { RadioGroupField } from '@/components/ui/radio-group-field'
import { SelectOption } from '@/components/ui/select'
import { SelectField } from '@/components/ui/select-field'
import { TextField } from '@/components/ui/text-field'
import { usePrevious } from '@/hooks/use-previous'
import { zoneOptions } from '@/utils'
import { climateOptions, listingTypeOptions, propertyTypeOptions } from '@/utils/listing'

export default function Profiler() {
  return (
    <main className="flex h-full">
      <div className="hidden h-full grow-[2] flex-col items-center justify-center bg-blue text-white md:flex">
        <PachonMessage
          variant="light"
          message="Todos te ofrecen lo que piensan que quieres, no lo que realmente necesitas. Queremos conocerte mejor,
        con base a una breve serie de preguntas el perfilador de IANUA se encarga de encontrar las propiedades
        que son perfectas para ti. Deja que tu hogar te encuentre."
        />
      </div>
      <div className="flex h-full grow-[6] flex-col items-center justify-center bg-white p-10 md:w-[50%]">
        <ProfilerCarousel />
      </div>
    </main>
  )
}

const rangeOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
]

const booleanOptions = [
  { value: '0', label: 'No' },
  { value: '1', label: 'Sí' },
]

const getSelectDefaultValue = (options: SelectOption[], multiple: boolean, value?: string | string[]) => {
  if (multiple) {
    return options.filter((o) => value?.includes(o.value)) ?? undefined
  }

  if (typeof value === 'boolean') {
    if (!value) return booleanOptions.find((o) => o.value === '0')
    return booleanOptions.find((o) => o.value === '1')
  }

  return options.find((o) => value?.includes(o.value)) ?? undefined
}

const ProfilerCarousel = () => {
  const { control, register } = useForm()
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
          <form>
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
              {step === 1 ? (
                <RadioGroupField
                  control={control}
                  options={rangeOptions}
                  name="natural_lighting"
                  label="¿Qué tanto valoras la iluminación natural?"
                />
              ) : null}
              {step === 2 ? (
                <SelectField
                  control={control}
                  name="climate"
                  options={climateOptions}
                  label="¿Te consideras una persona que le gusta más el calor o el frío o templado?"
                />
              ) : null}
              {step === 3 ? (
                <SelectField
                  control={control}
                  name="property_type"
                  options={propertyTypeOptions.filter((o) => o.value !== PropertyType.CLOSED_STREET)}
                  label="¿Casa o Depa?"
                  // defaultSelected={getSelectDefaultValue(listingTypeOptions, false, _defaultValues?.['type'])}
                />
              ) : null}
              {step === 4 ? (
                <SelectField
                  control={control}
                  name="type"
                  options={listingTypeOptions}
                  label="¿Planeas comprar o rentar?"
                  // defaultSelected={getSelectDefaultValue(listingTypeOptions, false, _defaultValues?.['type'])}
                />
              ) : null}
              {step === 5 ? (
                <TextField
                  id="stories"
                  type="number"
                  label="¿De cuántos pisos te imaginas?"
                  {...register('stories')}
                />
              ) : null}
              {step === 6 ? (
                <TextField
                  id="parkingSpots"
                  type="number"
                  label="¿Cuántos cajones de estacionamiento necesitas?"
                  {...register('parking_spots')}
                />
              ) : null}
              {step === 7 ? (
                <SelectField
                  control={control}
                  name="about"
                  options={booleanOptions}
                  label="¿Qué es lo tuyo?"
                  // defaultSelected={getSelectDefaultValue(listingTypeOptions, false, _defaultValues?.['type'])}
                />
              ) : null}
              {step === 8 ? (
                <SelectField
                  control={control}
                  options={booleanOptions}
                  name="pet_friendly"
                  label="¿Tienes mascotas?"
                />
              ) : null}
              {step === 9 ? (
                <RadioGroupField
                  control={control}
                  options={rangeOptions}
                  name="delivery"
                  label="¿Qué tanto pides delivery?"
                />
              ) : null}

              {step === 10 ? (
                <SelectField
                  control={control}
                  options={booleanOptions}
                  name="wants_credit"
                  label="¿Te interesa crédito hipotecario?"
                />
              ) : null}

              {step === 11 ? (
                <NumberField id="budget" control={control} name="budget" label="¿Cuál es tu presupesto?" />
              ) : null}

              {step === 12 ? (
                <SelectField control={control} name="desired_area" options={zoneOptions} label="Alcaldía" />
              ) : null}
            </motion.div>
          </form>
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
