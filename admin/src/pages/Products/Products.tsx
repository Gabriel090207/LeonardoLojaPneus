import { useState } from "react";
import "./Products.css";
import AdminLayout from "../../layouts/AdminLayout";
import ProductModal from "../../components/ProductModal/ProductModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";


import { db } from "../../services/firebase";
import { collection, addDoc } from "firebase/firestore";


import { useEffect } from "react";
import { getDocs } from "firebase/firestore";

import { doc, updateDoc, deleteDoc  } from "firebase/firestore";


export default function Products() {


  const [products, setProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);


  const [showDelete, setShowDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any | null>(null);



  const handleDelete = async (id: string) => {
  try {
    await deleteDoc(doc(db, "products", id));

    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );

    console.log("🗑️ Produto deletado");
  } catch (error) {
    console.error("Erro ao deletar:", error);
  }
};

    useEffect(() => {
    const loadProducts = async () => {
        try {
        const snapshot = await getDocs(collection(db, "products"));

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        setProducts(data);

        console.log("🔥 Produtos carregados");
        } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        }
    };

    loadProducts();
    }, []);




    

  return (
    <AdminLayout>

      <div className="products">

        {/* HEADER */}
        <div className="productsHeader">
          <h2>Produtos</h2>

          <button
            className="btnNew"
            onClick={() => setShowModal(true)}
          >
            + Novo Produto
          </button>
        </div>

        {/* TABELA */}
        <div className="tableWrapper">
          <table>

            <thead>
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Ações</th>
              </tr>
            </thead>

           <tbody>
  {products.length === 0 ? (
    <tr className="emptyRow">
      <td colSpan={5}>
        <div className="emptyWrapper">
          Nenhum produto cadastrado
        </div>
      </td>
    </tr>
  ) : (
    products.map((product, index) => (
      <tr key={index}>
        <td>
          {product.image && (
            <img src={product.image} className="productImage" />
          )}
        </td>

        <td>{product.name}</td>
        <td>{product.price}</td>
        <td className="stockCell">{product.stock}</td>

       <td className="actionsCell">
  <button
  className="btnEdit"
  onClick={() => {
    setEditingProduct(product);
    setShowModal(true);
  }}
>
  Editar
</button>
  <button
  className="btnDelete"
  onClick={() => {
    setProductToDelete(product);
    setShowDelete(true);
  }}
>
  Excluir
</button>
</td>
      </tr>
    ))
  )}
</tbody>


          </table>
        </div>

      </div>

      {/* MODAL */}
      {showModal && (
        <ProductModal
  onClose={() => {
    setShowModal(false);
    setEditingProduct(null);
  }}
  product={editingProduct}
          onSave={async (product: any) => {
  try {

    if (editingProduct) {
      // 🔥 EDITAR
      const refDoc = doc(db, "products", editingProduct.id);

      await updateDoc(refDoc, product);

      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...product } : p
        )
      );

    } else {
      // 🔥 NOVO
      const docRef = await addDoc(collection(db, "products"), product);

      setProducts((prev) => [
        ...prev,
        { id: docRef.id, ...product }
      ]);
    }

    setShowModal(false);
    setEditingProduct(null);

  } catch (error) {
    console.error("Erro:", error);
  }
}}
        />
      )}


{showDelete && (
  <DeleteModal
  type="produto"
  onClose={() => {
    setShowDelete(false);
    setProductToDelete(null);
  }}
  onConfirm={() => {
    handleDelete(productToDelete.id);
    setShowDelete(false);
    setProductToDelete(null);
  }}
/>
)}

    </AdminLayout>
  );
}