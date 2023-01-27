import { Layout } from '@/components';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout home={true}>
      <section className='container container-home'>
        <div className='container__header'>
          <h1>Weather forecasts</h1>
          <p>
            View weather forecasts for the city or cities of your choice. Select
            a city below or search for others via the search field on the left.
          </p>

          <p>
            You can select several cities, view their weather forecasts for 1 to
            7 days and remove cities from the view.
          </p>
        </div>
        <div className='container__content'>
          <Link href='/weather' passHref>
            <div id='tre-card' className='card card-img'>
              <span className='card__title'>Tampere</span>
            </div>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
