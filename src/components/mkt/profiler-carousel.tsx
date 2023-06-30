'use client'

import { useState } from 'react'

import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListingViews, PropertyType } from '@prisma/client'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FieldValues, useForm } from 'react-hook-form'
import { useMeasure } from 'react-use'

import { Button, buttonVariants } from '@/components/ui/button'
import { NumberField } from '@/components/ui/number-field'
import { RadioGroupField } from '@/components/ui/radio-group-field'
import { SelectOption } from '@/components/ui/select'
import { SelectField } from '@/components/ui/select-field'
import { TextField } from '@/components/ui/text-field'
import { usePrevious } from '@/hooks/use-previous'
import { toast } from '@/hooks/use-toast'
import { Listing } from '@/types/listing'
import { zoneOptions } from '@/utils'
import { climateOptions, listingTypeAltOptions, propertyTypeOptions } from '@/utils/listing'

import ListingCard from '../shared/listing-card'

const rangeOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
]

const viewsOptions = [
  { value: ListingViews.OPEN, label: 'Clara' },
  { value: ListingViews.CLOSED, label: 'Me da igual' },
]

const appartmentTypeOptions = [
  { value: 'appartment', label: 'Departamento' },
  { value: 'ph', label: 'PH' },
]

const booleanOptions = [
  { value: '0', label: 'No' },
  { value: '1', label: 'Sí' },
]

const lookingForOptions = [
  { value: 'me', label: 'Para mi' },
  { value: 'family', label: 'Para un familiar' },
  { value: 'co-own', label: 'Copropiedad (Comprar entre 2 o más personas)' },
]

const hobbiesOptions = [
  { value: 'sports', label: '⚽️🏀🏸🏈🏃‍♀️' },
  { value: 'chill', label: '🛋️' },
  { value: 'idgaf', label: 'Me da igual' },
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

export const ProfilerCarousel = () => {
  const {
    control,
    register,
    getValues,
    formState: { submitCount },
    reset,
    handleSubmit,
    watch,
  } = useForm()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [listings, setListtings] = useState<Listing[]>([])
  const prev = usePrevious(step)
  const [ref, { width }] = useMeasure<HTMLDivElement>()

  const direction = prev && step > prev ? 1 : -1

  const handleNext = () => {
    if (step < 16) setStep(step + 1)
  }

  const onSubmit = async (data: FieldValues) => {
    const {
      natural_lighting,
      property_type,
      type,
      stories,
      parking_spots,
      pet_friendly,
      budget,
      desired_area,
    } = data
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append(
        'data',
        JSON.stringify({
          profiler: 'true',
          natural_lighting,
          property_type,
          type,
          stories,
          parking_spots,
          pet_friendly: pet_friendly ? pet_friendly : undefined,
          price: budget,
          locality: desired_area,
        })
      )

      const res = await fetch(`/api/profiler`, {
        method: 'post',
        body: formData,
      })
      const { data, ...rest } = await res.json()

      setListtings(data)

      setTimeout(() => {
        if (listings.length) {
          toast({
            title: '¡Encontramos opciones para ti!',
            description:
              'Revisa estas opciones que tenemos para ti. Para ver más resultados puedes volver a hacer el proceso del perfilador.',
          })
        }
        setLoading(false)
      }, 3500)
    } catch (error) {
      console.log(error)
      toast({
        title: 'Oooops!',
        description: 'Ocurrió un error. Intenta nuevamente.',
        variant: 'destructive',
      })
      setLoading(false)
    }
  }

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1)
      return
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-white">
        <h2 className="mb-3 text-center text-3xl">Estamos buscando tu hogar ideal...</h2>
        <Image src="/pachon-headset.png" width={250} height={250} alt="Pachon" />
        <FontAwesomeIcon icon={faSpinner} className="mt-5 animate-spin text-blue" size="5x" />
      </div>
    )
  }

  if (submitCount > 0 && listings?.length) {
    return (
      <>
        <div className="relative flex h-full w-full items-center justify-center gap-5 overflow-auto">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} target="_blank" share />
          ))}
        </div>
        <Link
          href=" https://crediteka.com/ianua/precalificate"
          target="_blank"
          className={buttonVariants({ className: 'w-full' })}
        >
          Precalifica para un crédito hipotecario
        </Link>
      </>
    )
  }

  if (submitCount > 0 && !listings?.length) {
    return (
      <>
        <h2 className="text-2xl">
          No encontramos propiedades que cumplan con tus requisitos. Intenta cambiando algunos parámetros.
        </h2>

        <div className="mt-10 flex flex-col gap-5">
          <Button
            className="w-full"
            onClick={() => {
              setStep(1)
              reset()
            }}
          >
            Intentar nuevamente
          </Button>
          <Link
            href=" https://crediteka.com/ianua/precalificate"
            target="_blank"
            className={buttonVariants({ className: 'w-full', variant: 'outline' })}
          >
            Precalifica para un crédito hipotecario
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <div
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden"
        ref={ref}
      >
        <h1 className="text-3xl">Perfilador</h1>
        <AnimatePresence custom={{ direction, width }}>
          <form
            className="flex h-full w-full flex-col items-center justify-center"
            onSubmit={step === 16 ? handleSubmit(onSubmit) : (e) => e.preventDefault()}
            id="profilerForm"
          >
            <motion.div
              key={step}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={{ direction, width }}
              transition={{ bounce: 0 }}
              className="absolute flex w-full flex-col items-center justify-center"
            >
              {step === 1 ? (
                <div className="w-full px-8">
                  <SelectField
                    fullWidth
                    control={control}
                    name="interested"
                    options={booleanOptions}
                    label="¿Realmente estás interesado en comprar o rentar?"
                    hint="Se acepta sólo venir a explorar, esto no afecta tu resultado. Es información valiosa para nosotros 😉"
                    defaultSelected={getSelectDefaultValue(booleanOptions, false, getValues('interested'))}
                  />
                </div>
              ) : null}

              {step === 2 ? (
                <div className="w-full px-8">
                  <SelectField
                    fullWidth
                    control={control}
                    name="looking_for"
                    options={lookingForOptions}
                    label="¿Estás buscando para ti o para alguien más?"
                    defaultSelected={getSelectDefaultValue(
                      lookingForOptions,
                      false,
                      getValues('looking_for')
                    )}
                  />
                </div>
              ) : null}

              {step === 3 ? (
                <div className="px-8">
                  <RadioGroupField
                    control={control}
                    className="w-full"
                    options={rangeOptions}
                    name="natural_lighting"
                    label="¿Qué tanto valoras la iluminación natural?"
                  />
                </div>
              ) : null}
              {step === 4 ? (
                <div className="w-full px-8">
                  <SelectField
                    fullWidth
                    control={control}
                    name="climate"
                    options={climateOptions}
                    label="¿Te consideras una persona que le gusta más el calor, el frío o templado?"
                    defaultSelected={getSelectDefaultValue(climateOptions, false, getValues('climate'))}
                  />
                </div>
              ) : null}
              {step === 5 ? (
                <div className="w-full px-8">
                  <SelectField
                    fullWidth
                    control={control}
                    name="property_type"
                    options={propertyTypeOptions.filter((o) => o.value !== PropertyType.CLOSED_STREET)}
                    label="¿Casa o Depa?"
                    defaultSelected={getSelectDefaultValue(
                      propertyTypeOptions,
                      false,
                      getValues('preperty_type')
                    )}
                  />
                  {watch('property_type')?.includes(PropertyType.APPARTMENT) ? (
                    <div className="mt-3 w-full px-8">
                      <RadioGroupField
                        control={control}
                        options={appartmentTypeOptions}
                        name="appartment_type"
                        label="¿Departamento o PH?"
                      />
                    </div>
                  ) : null}
                  {watch('property_type')?.includes(PropertyType.APPARTMENT) ? (
                    <div className="mt-3 w-full px-8">
                      <RadioGroupField
                        control={control}
                        options={viewsOptions}
                        name="views"
                        label="¿Cómo te gustan la vista desde tu departamento?"
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
              {step === 6 ? (
                <div className="w-full px-8">
                  <SelectField
                    fullWidth
                    control={control}
                    name="type"
                    options={listingTypeAltOptions}
                    label="¿Planeas comprar o rentar?"
                    defaultSelected={getSelectDefaultValue(listingTypeAltOptions, false, getValues('type'))}
                  />
                </div>
              ) : null}
              {step === 7 ? (
                <div className="px-8">
                  <TextField
                    id="stories"
                    type="number"
                    label="¿De cuántos pisos te imaginas?"
                    {...register('stories')}
                  />
                </div>
              ) : null}
              {step === 8 ? (
                <div className="px-8">
                  <TextField
                    id="parkingSpots"
                    type="number"
                    label="¿Cuántos cajones de estacionamiento necesitas?"
                    {...register('parking_spots')}
                  />
                </div>
              ) : null}
              {step === 9 ? (
                <div className="px-8">
                  <SelectField
                    fullWidth
                    control={control}
                    name="hobbies"
                    options={hobbiesOptions}
                    label="¿Qué es lo tuyo?"
                    defaultSelected={getSelectDefaultValue(hobbiesOptions, false, getValues('hobbies'))}
                  />
                </div>
              ) : null}
              {step === 10 ? (
                <div className="w-full px-8">
                  <SelectField
                    fullWidth
                    control={control}
                    options={booleanOptions}
                    name="pet_friendly"
                    label="¿Tienes mascotas?"
                    defaultSelected={getSelectDefaultValue(booleanOptions, false, getValues('pet_friendly'))}
                  />
                </div>
              ) : null}

              {step === 11 ? (
                <div className="px-8">
                  <RadioGroupField
                    control={control}
                    options={rangeOptions}
                    name="delivery"
                    label="¿Qué tanto pides delivery?"
                  />
                </div>
              ) : null}

              {step === 12 ? (
                <div className="px-8">
                  <NumberField id="budget" control={control} name="budget" label="¿Cuál es tu presupesto?" />
                </div>
              ) : null}

              {step === 13 ? (
                <div className="w-full px-8">
                  <SelectField
                    fullWidth
                    control={control}
                    options={booleanOptions}
                    name="furnished"
                    label="¿Amueblado?"
                    defaultSelected={getSelectDefaultValue(booleanOptions, false, getValues('furnished'))}
                  />
                </div>
              ) : null}

              {step === 14 ? (
                <div className="px-8">
                  <RadioGroupField
                    control={control}
                    options={rangeOptions}
                    name="event_policy_strictness"
                    label="¿Qué tanto toleras las fiestas de los demás?"
                  />
                </div>
              ) : null}

              {step === 15 ? (
                <div className="w-full px-8">
                  <SelectField
                    fullWidth
                    control={control}
                    options={booleanOptions}
                    name="wants_credit"
                    label="¿Te interesa crédito hipotecario?"
                    defaultSelected={getSelectDefaultValue(booleanOptions, false, getValues('wants_credit'))}
                  />
                </div>
              ) : null}

              {step === 16 ? (
                <div className="w-full px-8">
                  <SelectField
                    fullWidth
                    control={control}
                    name="desired_area"
                    options={zoneOptions}
                    label="Alcaldía"
                    defaultSelected={getSelectDefaultValue(zoneOptions, false, getValues('desired_area'))}
                  />
                </div>
              ) : null}
            </motion.div>
          </form>
        </AnimatePresence>
      </div>

      <div className="flex w-full items-center justify-between">
        <Button variant="ghost" onClick={handlePrev} disabled={step === 1} type="button">
          Atrás
        </Button>
        <Button
          onClick={step === 16 ? undefined : handleNext}
          type={step === 16 ? 'submit' : 'button'}
          form={step === 16 ? 'profilerForm' : undefined}
        >
          {step === 16 ? 'Buscar Propiedades' : 'Siguiente'}
        </Button>
      </div>
    </>
  )
}

const variants = {
  initial: ({ direction, width }: { direction: number; width: number }) => ({ x: width * direction }),
  animate: { x: 0 },
  exit: ({ direction, width }: { direction: number; width: number }) => ({ x: -width * direction }),
}
