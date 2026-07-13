import "./ProductModal.css";
import { useState, useEffect } from "react";
import { FiUpload, FiX } from "react-icons/fi";

import { storage } from "../../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProductModal({ onClose, onSave, product }: any) {



    const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
    
  const [images, setImages] = useState<any[]>([]);
  const [video, setVideo] = useState<any | null>(null);
  const [price, setPrice] = useState("R$ 0,00"); // visual
  const [priceValue, setPriceValue] = useState(0); // REAL 🔥
  const [loading, setLoading] = useState(false);
  // 🔥 básicos
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  // 🔥 novos campos técnicos
  const [medida, setMedida] = useState("");
  const [aro, setAro] = useState("");
  const [garantia, setGarantia] = useState("");
  const [uso, setUso] = useState("");
  const [certificacao, setCertificacao] = useState("");
  const [highlight1, setHighlight1] = useState("");
  const [highlight2, setHighlight2] = useState("");
  const [highlight3, setHighlight3] = useState("");

  // 📸 Upload imagens
  const handleImages = (e: any) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file: any) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVideo = (e: any) => {
  const file = e.target.files[0];

  if (!file) return;

  setVideo({
    file,
    preview: URL.createObjectURL(file),
  });
};

const removeVideo = () => {
  setVideo(null);
};

  // 💰 máscara preço
  const handlePrice = (value: string) => {
  let numbers = value.replace(/\D/g, "");

  if (numbers.length === 0) {
    setPrice("R$ 0,00");
    setPriceValue(0);
    return;
  }

  const numeric = Number(numbers) / 100;

  const formatted = numeric.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  setPrice(formatted);
  setPriceValue(numeric); // 🔥 salva número
};

  // 💾 salvar produto
  const handleSave = async () => {
    try {

      setLoading(true);

      const uploadedImages: string[] = [];

      let uploadedVideo = "";

      for (const img of images) {
        if (!img.file) {
          uploadedImages.push(img.preview); // imagem já existente
          continue;
        }



        const imageRef = ref(
          storage,
          `products/${Date.now()}-${img.file.name}`
        );

        await uploadBytes(imageRef, img.file);
        const url = await getDownloadURL(imageRef);

        uploadedImages.push(url);
      }

      /* 🎥 upload vídeo */
if (video) {

  // vídeo já existente
  if (!video.file) {
    uploadedVideo = video.preview;
  } else {

    const videoRef = ref(
      storage,
      `products/videos/${Date.now()}-${video.file.name}`
    );

    await uploadBytes(videoRef, video.file);

    uploadedVideo = await getDownloadURL(videoRef);
  }
}

      const newProduct = {
        name,

        slug: slugify(name),        // produto
  brandSlug: slugify(brand), 
  
        description,
        brand,
        category,
        price: priceValue, // 🔥 agora é número
        stock,

        // 🔥 novos campos
        medida,
        aro,
        garantia,
        uso,
        certificacao,


        highlights: [highlight1, highlight2, highlight3],

        image: uploadedImages[0] || null,
        images: uploadedImages,
        video: uploadedVideo || null,
      };

      onSave(newProduct);

   } catch (error) {
  console.error("Erro no upload:", error);
} finally {
  setLoading(false);
}
  };

  // 🔥 preencher edição
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setBrand(product.brand || "");
      setCategory(product.category || "");
      setPrice(
  product.price
    ? Number(product.price).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    : "R$ 0,00"
);

setPriceValue(product.price || 0);
      setStock(product.stock || "");

      setMedida(product.medida || "");
      setAro(product.aro || "");
      setGarantia(product.garantia || "");
      setUso(product.uso || "");
      setCertificacao(product.certificacao || "");


      setHighlight1(product.highlights?.[0] || "");
      setHighlight2(product.highlights?.[1] || "");
      setHighlight3(product.highlights?.[2] || "");   

      setImages(
        product.images?.map((url: string) => ({
          preview: url,
          file: null,
        })) || []
      );

      if (product.video) {
  setVideo({
    preview: product.video,
    file: null,
  });
}
    }
  }, [product]);

  return (
    <div className="modalOverlay">

      <div className="modal">

        {/* HEADER */}
        <div className="modalHeader">
          <h2>{product ? "Editar Produto" : "Novo Produto"}</h2>
          <button onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* BODY */}
        <div className="modalBody">

          {/* NOME */}
          <input
            placeholder="Nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />


          <div className="grid3">
            <input
                placeholder="Qualidade 1 (ex: Maior estabilidade)"
                value={highlight1}
                onChange={(e) => setHighlight1(e.target.value)}
            />

            <input
                placeholder="Qualidade 2 (ex: Excelente aderência)"
                value={highlight2}
                onChange={(e) => setHighlight2(e.target.value)}
            />

            <input
                placeholder="Qualidade 3 (ex: Uso urbano e estrada)"
                value={highlight3}
                onChange={(e) => setHighlight3(e.target.value)}
            />
          </div>

          {/* DESCRIÇÃO */}
          <textarea
            placeholder="Descrição (ex: Alta durabilidade, Garantia de 5 anos...)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* MARCA + CATEGORIA */}
          <div className="grid2">

            <input
              placeholder="Marca"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />

            <div className="selectWrapper">
              <select
                className="selectInput"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Categoria</option>
                <option value="pneu">Pneu</option>
                <option value="roda">Roda</option>
                <option value="acessorio">Acessório</option>
              </select>
            </div>

          </div>

          {/* 🔥 INFORMAÇÕES TÉCNICAS */}
          <div className="grid2">
            <input
              placeholder="Medida (ex: 195/55 R15)"
              value={medida}
              onChange={(e) => setMedida(e.target.value)}
            />

            <input
              placeholder="Aro"
              value={aro}
              onChange={(e) => setAro(e.target.value)}
            />
          </div>

         <div className="grid3">

  <input
    placeholder="Garantia (ex: 5 anos)"
    value={garantia}
    onChange={(e) => setGarantia(e.target.value)}
  />

  <input
    placeholder="Uso (ex: Urbano / Rodovia)"
    value={uso}
    onChange={(e) => setUso(e.target.value)}
  />

  <input
    placeholder="Certificação (ex: Inmetro)"
    value={certificacao}
    onChange={(e) => setCertificacao(e.target.value)}
  />

</div>

          {/* PREÇO + ESTOQUE */}
          <div className="grid2">

            <input
              placeholder="Preço"
              value={price}
              onChange={(e) => handlePrice(e.target.value)}
            />

            <input
              type="number"
              placeholder="Estoque"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />

          </div>

          {/* UPLOAD */}
          <div className="uploadBox">

            <label className="uploadArea">
              <FiUpload size={22} />
              <span>Adicionar imagens</span>
              <input
                type="file"
                multiple
                onChange={handleImages}
                hidden
              />
            </label>

             {/* PREVIEW */}
            <div className="previewImages">
              {images.map((img, i) => (
                <div key={i} className="previewItem">

                  <img src={img.preview} />

                  <button
                    className="removeImg"
                    onClick={() => removeImage(i)}
                  >
                    <FiX size={14} />
                  </button>

                </div>
              ))}
            </div>



            <label className="uploadArea">
  <FiUpload size={22} />
  <span>Adicionar vídeo</span>

  <input
    type="file"
    accept="video/*"
    onChange={handleVideo}
    hidden
  />
</label>

           


          </div>


          {/* PREVIEW VÍDEO */}
{video && (
  <div className="videoPreview">

    <video
      src={video.preview}
      controls
      className="previewVideo"
    />

    <button
      className="removeVideo"
      onClick={removeVideo}
    >
      <FiX size={14} />
    </button>

  </div>
)}

        </div>

        {/* FOOTER */}
        <div className="modalFooter">
          <button onClick={onClose}>Cancelar</button>

          <button
  className={`btnSave ${loading ? "loading" : ""}`}
  onClick={handleSave}
  disabled={loading}
>
  {loading ? "Salvando produto..." : "Salvar"}
</button>
        </div>

      </div>

    </div>
  );
}