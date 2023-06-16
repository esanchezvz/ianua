import Link from 'next/link'

import { Container } from '@/components/ui/container'

// TODO - fetch from backend
const faqs = [
  {
    question: 'Perfilador vs filtro',
    answer:
      'Nuestro perfilador está diseñado para optimizar tu búsqueda de propiedades. Con base a un breve cuestionario, pretendemos entender mejor lo que quieres encontrar; el perfilador arroja las 6 mejores propiedades para ti.',
  },
  {
    question: '¿Me pueden ayudar a vender mi propiedad?',
    answer: 'Claro que sí! Contáctanos por medio de nuestro Whatsapp Business para más detalle.',
  },
  {
    question: '¿Las propiedades son de ustedes?',
    answer: 'No. Por el momento somos intermediarios entre el profesional inmobiliario y el cliente final.',
  },

  {
    question: '¿Dónde operan?',
    answer: '¡En Ciudad de México! Próximamente nos expandiremos a través de la República.',
  },
  {
    question: 'Quiero saber más sobre los créditos hipotecarios',
    answer:
      'Contamos con excelentes alianzas para facilitar el proceso de búsqueda de créditos. Contáctanos por medio de nuestro Whatsapp Business para más detalle.',
  },
  {
    question: '¿Qué son las asistencias y cómo funcionan?',
    answer: 'TBD',
  },

  {
    question: '¿Ofrecen asesoría legal?',
    answer:
      ' Sí. Para saber más acerca de nuestro servicio de asesoria legal contáctanos por medio de nuestro Whatsapp Business.',
  },
]

export default function Faqs() {
  return (
    <section id="faqs" aria-labelledby="faqs-title" className="border-t border-gray-200 py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 id="faqs-title" className="text-3xl font-medium tracking-tight text-gray-900">
            Preguntas Frecuentes
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Si tienes alguna otra duda,{' '}
            <Link href="mailto:info@example.com" className="text-gray-900 underline">
              contáctanos
            </Link>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((faq, i) => (
            <li key={i}>
              <h3 className="text-lg font-semibold leading-6 text-gray-900">{faq.question}</h3>
              <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
