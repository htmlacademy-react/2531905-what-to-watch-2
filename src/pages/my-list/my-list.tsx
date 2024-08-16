import Header from '@/components/header/header';
import {useAppSelector} from '@/hooks/use-app-selector';
import {getFavorite} from '@/store/film/selectors';
import Card from '@/components/card/card';
import Footer from '@/components/footer/footer';

function MyList() {
  const favorite = useAppSelector(getFavorite);

  return (
    <div className="user-page">
      <Header className="user-page__head" showList />

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {
            favorite.length === 0 && (
              <div className="catalog__title">
                <p className="page-title">
                  No film added to the list.
                </p>
                <p>
                  You can add film to the list by clicking on the &quot;+ My List&quot; button
                  on the &quot;Film&quot; page and on the main page for the promo film.
                </p>
              </div>
            )
          }
          {
            favorite.map((film) => <Card key={film.id} film={film}/>)
          }
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default MyList;
