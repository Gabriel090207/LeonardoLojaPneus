import "./Tires.css";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { db } from "../../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";

function Tires() {


  const [appliedFilters, setAppliedFilters] = useState({
  brand: "",
  aro: "",
  category: "",
});

const [loadingFilter, setLoadingFilter] = useState(false);

  const [order, setOrder] = useState("relevance");

  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);

  // filtros
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [aro, setAro] = useState("");
  const [category, setCategory] = useState("");


  const [offerIds, setOfferIds] = useState<string[]>([]);

  // 🔥 FUNÇÃO DE FILTRO (REUTILIZÁVEL)
  const applyFiltersWithData = (data: any[]) => {
    // 🔥 REMOVE PRODUTOS EM OFERTA
let result = data.filter((p) => !offerIds.includes(p.id));


    

    if (search) {
      result = result.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (appliedFilters.brand) {
    result = result.filter((p) => p.brand === appliedFilters.brand);
  }

  if (appliedFilters.aro) {
    result = result.filter((p) => p.aro === appliedFilters.aro);
  }

  if (appliedFilters.category) {
    result = result.filter((p) => p.category === appliedFilters.category);
  }

    // 🔥 ORDENAÇÃO
if (order === "price-asc") {
  result.sort((a, b) => a.price - b.price);
}

if (order === "price-desc") {
  result.sort((a, b) => b.price - a.price);
}

if (order === "sales") {
  result.sort((a, b) => (b.sales || 0) - (a.sales || 0));
}

    setFiltered(result);
  };

  // 🔥 REALTIME FIREBASE
  useEffect(() => {
    const ref = collection(db, "products");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const list: any[] = [];

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setProducts(list);
      applyFiltersWithData(list); // 🔥 mantém filtro ao atualizar
    });

    return () => unsubscribe();
  }, []);

  // 🔥 REAPLICA FILTRO QUANDO INPUTS MUDAM
 useEffect(() => {
  applyFiltersWithData(products);
}, [search, appliedFilters, order, offerIds]);


useEffect(() => {
  const ref = collection(db, "offers");

  const unsubscribe = onSnapshot(ref, (snapshot) => {
    const ids: string[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.productId) {
        ids.push(data.productId);
      }
    });

    setOfferIds(ids);
  });

  return () => unsubscribe();
}, []);

  // opções dinâmicas
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];
  const aros = [...new Set(products.map((p) => p.aro).filter(Boolean))];



 const getInstallment = (price: number, max = 10) => {
  if (!price) return "";

  const value = price / max;

  return `${max}x de ${value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} sem juros`;
};



  return (
    <section className="tires-page">
      <div className="container">

        {/* HERO */}
        <div className="tires-hero">
          <span className="page__badge">Pneus</span>

          <h1>
            Encontre o <span className="text-red">pneu ideal</span>
          </h1>
        </div>

        {/* TOPBAR */}
        <div className="tires-topbar">
          <span className="tires-results">
            {filtered.length} produtos encontrados
          </span>

         <select
  className="tires-order"
  value={order}
  onChange={(e) => setOrder(e.target.value)}
>
  <option value="relevance">Mais relevantes</option>
  <option value="price-asc">Menor preço</option>
  <option value="price-desc">Maior preço</option>
  <option value="sales">Mais vendidos</option>
</select>
        </div>

        <div className="tires-layout">

          {/* SIDEBAR */}
          <aside className="tires-sidebar">
            <h3>Filtrar busca</h3>

            {/* BUSCA */}
            <div className="filter-group">
              <label>Buscar</label>

              <div className="filter-search">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Nome ou medida"
                />
                <FiSearch />
              </div>
            </div>

            {/* MARCA */}
            <div className="filter-group">
              <label>Marca</label>
              <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="">Todas</option>
                {brands.map((b, i) => (
                  <option key={i}>{b}</option>
                ))}
              </select>
            </div>

            {/* ARO */}
            <div className="filter-group">
              <label>Aro</label>
              <select value={aro} onChange={(e) => setAro(e.target.value)}>
                <option value="">Todos</option>
                {aros.map((a, i) => (
                  <option key={i}>{a}</option>
                ))}
              </select>
            </div>

            {/* CATEGORIA */}
            <div className="filter-group">
              <label>Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="pneu">Pneu</option>
                <option value="roda">Roda</option>
                <option value="acessorio">Acessório</option>
              </select>
            </div>

          <button
  className={`btn-primary filter-button ${loadingFilter ? "loading" : ""}`}
  onClick={() => {
  setLoadingFilter(true);

  setTimeout(() => {
    const newFilters = {
      brand,
      aro,
      category,
    };

    setAppliedFilters(newFilters);

    applyFiltersWithData(products); // 🔥 força aplicação

    setLoadingFilter(false);
  }, 600);
}}
>
  Aplicar filtros
</button>

          </aside>

          {/* PRODUTOS */}
          <div className="tires-products">
            {filtered.map((product) => (
              <article className="product-card" key={product.id}>

                <div className="product-card__image">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="product-card__content">
                  <h3>{product.name}</h3>

                  <ul className="product-card__benefits">
                    {product.highlights?.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <span className="product-card__price">
  {Number(product.price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}
</span>


                  <span className="product-card__installment">
  {getInstallment(product.price)}
</span> 

                  <Link
  to={`/pneus/${product.brandSlug}/${product.slug}`}
  className="product-card__button"
>
  Ver detalhes
</Link>

                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Tires;