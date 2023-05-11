import { Container } from '@/components/ui/container'
import {
  DeviceArrowIcon,
  DeviceCardsIcon,
  DeviceClockIcon,
  DeviceListIcon,
  DeviceLockIcon,
  DeviceChartIcon,
} from '@/components/ui/icons'

const features = [
  {
    name: 'Invest any amount',
    description: 'Whether it’s $1 or $1,000,000, we can put your money to work for you.',
    icon: DeviceArrowIcon,
  },
  {
    name: 'Build a balanced portfolio',
    description: 'Invest in different industries to find the most opportunities to win huge.',
    icon: DeviceCardsIcon,
  },
  {
    name: 'Trade in real-time',
    description: 'Get insider tips on big stock moves and act on them within seconds.',
    icon: DeviceClockIcon,
  },
  {
    name: 'Profit from your network',
    description: 'Invite new insiders to get tips faster and beat even other Pocket users.',
    icon: DeviceListIcon,
  },
  {
    name: 'Encrypted and anonymized',
    description: 'Cutting-edge security technology that even the NSA doesn’t know about keeps you hidden.',
    icon: DeviceLockIcon,
  },
  {
    name: 'Portfolio tracking',
    description: 'Watch your investments grow exponentially, leaving other investors in the dust.',
    icon: DeviceChartIcon,
  },
]

export default function Services() {
  return (
    <section aria-label="Servicios ofrecidos por Ianua" className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900">Estos son nuestros servicios</h2>
          <p className="mt-2 text-lg text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita repellat officiis, culpa harum
            laudantium dolorem nesciunt necessitatibus, sequi unde quae.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
        >
          {features.map((feature) => (
            <li key={feature.name} className="rounded-2xl border border-gray-200 p-8">
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-6 font-semibold text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-gray-700">{feature.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
