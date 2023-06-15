import { PachonMessage } from '@/components/shared/pachon-message'
import { Container } from '@/components/ui/container'

// const features = [
//   {
//     name: 'Invest any amount',
//     description: 'Whether it’s $1 or $1,000,000, we can put your money to work for you.',
//     icon: DeviceArrowIcon,
//   },
//   {
//     name: 'Build a balanced portfolio',
//     description: 'Invest in different industries to find the most opportunities to win huge.',
//     icon: DeviceCardsIcon,
//   },
//   {
//     name: 'Trade in real-time',
//     description: 'Get insider tips on big stock moves and act on them within seconds.',
//     icon: DeviceClockIcon,
//   },
//   {
//     name: 'Profit from your network',
//     description: 'Invite new insiders to get tips faster and beat even other Pocket users.',
//     icon: DeviceListIcon,
//   },
//   {
//     name: 'Encrypted and anonymized',
//     description: 'Cutting-edge security technology that even the NSA doesn’t know about keeps you hidden.',
//     icon: DeviceLockIcon,
//   },
//   {
//     name: 'Portfolio tracking',
//     description: 'Watch your investments grow exponentially, leaving other investors in the dust.',
//     icon: DeviceChartIcon,
//   },
// ]

export default function Services() {
  return (
    <section aria-label="Servicios ofrecidos por Ianua" className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900">Lo que Ianua te ofrece</h2>
          <p className="mt-2 text-lg text-gray-600">
            Nuestros servicios están diseñados para que tomes la mejor decisión y tengas la tranquilidad que
            nosotros estamos contigo aún después de comprar o rentar con Ianua.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900">Asistencia Legal</h2>
          <p className="mt-2 text-lg text-gray-600">
            Deja que nuestro equipo te asesore; aun si quieres comprar con nosotros o no! Todo de la manera
            más transparente y segura.
          </p>
        </div>
      </Container>
    </section>
  )
}
