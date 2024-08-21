import Header from '@/components/header/header';

function Loader() {
  return (
    <div className="user-page">
      <Header className="user-page__head"/>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <h1>Loading film...</h1>
        </div>
      </section>

    </div>
  );
}

export default Loader;
