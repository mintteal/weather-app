import { Layout } from '@/components';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout home={true}>
      <section className='container container-home'>
        <div className='container__header'>
          <p>Start by selecting a city</p>
        </div>
        <div className='container__content'>
          <Link href='/weather/helsinki' passHref>
            <div id='hki-card' className='card card-img'>
              <span className='card__title'>Helsinki</span>
            </div>
          </Link>

          <Link href='/weather/tampere' passHref>
            <div id='tre-card' className='card card-img'>
              <span className='card__title'>Tampere</span>
            </div>
          </Link>

          <Link href='/weather/turku' passHref>
            <div id='tku-card' className='card card-img'>
              <span className='card__title'>Turku</span>
            </div>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
