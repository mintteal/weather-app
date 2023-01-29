import { Layout } from '@/components';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout home={true}>
      <section className='container container-home'>
        <div className='container__content'>
          <Link
            href={{
              pathname: '/weather/helsinki/',
              query: { country: 'Finland', lat: '60.17', lon: '24.95' },
            }}
            passHref
          >
            <div id='hki-card' className='card card-img'>
              <span className='card__title'>Helsinki</span>
            </div>
          </Link>

          <Link
            href={{
              pathname: '/weather/tampere/',
              query: { country: 'Finland', lat: '61.5', lon: '23.8' },
            }}
            passHref
          >
            <div id='tre-card' className='card card-img'>
              <span className='card__title'>Tampere</span>
            </div>
          </Link>

          <Link
            href={{
              pathname: '/weather/turku/',
              query: { country: 'Finland', lat: '60.45', lon: '22.28' },
            }}
            passHref
          >
            <div id='tku-card' className='card card-img'>
              <span className='card__title'>Turku</span>
            </div>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
