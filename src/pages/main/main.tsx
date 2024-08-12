import Genres from '@/components/genres/genres';
import FilmsList from '@/components/films-list/films-list';
import PromoCard from '@/components/promo-card/promo-card';
import Footer from '@/components/footer/footer';

function Main() {
  return (
    <>
      <PromoCard />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <Genres />
          <FilmsList />
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Main;
