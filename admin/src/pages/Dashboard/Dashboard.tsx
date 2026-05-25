import "./Dashboard.css";
import AdminLayout from "../../layouts/AdminLayout";

import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";

const data = [
  { name: "Jan", vendas: 400 },
  { name: "Fev", vendas: 300 },
  { name: "Mar", vendas: 600 },
  { name: "Abr", vendas: 800 },
  { name: "Mai", vendas: 500 },
];


function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fafafa",
          border: "1px solid rgba(0,0,0,0.06)",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <p style={{ color: "#555", marginBottom: "5px" }}>
          {label}
        </p>

        <p style={{ color: "#ff1a1a", fontWeight: "bold" }}>
          vendas: {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
}

export default function Dashboard() {
  return (
    <AdminLayout>

      <div className="dashboard">

        {/* RESUMO */}
        <h2 className="sectionTitle">Resumo</h2>

        <div className="cards">

          <div className="card">
            <h3>Vendas</h3>
            <p>R$ 12.500</p>
          </div>

          <div className="card">
            <h3>Pedidos</h3>
            <p>120</p>
          </div>

          <div className="card">
            <h3>Clientes</h3>
            <p>85</p>
          </div>

          <div className="card">
            <h3>Produtos</h3>
            <p>40</p>
          </div>

        </div>

        {/* GRÁFICO */}
        <h2 className="sectionTitle">Vendas Mensais</h2>

        <div className="chartBox">

          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart
  data={data}
  margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
>

              {/* 🔥 GRADIENTE */}
              <defs>
                <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stopColor="#b30000" stopOpacity={0.8}/>
  <stop offset="40%" stopColor="#800000" stopOpacity={0.5}/>
  <stop offset="100%" stopColor="#400000" stopOpacity={0}/>
</linearGradient>
              </defs>

              {/* GRID */}
              <CartesianGrid stroke="#2a2a2a" strokeDasharray="3 3" vertical={false} />

              {/* EIXOS */}
              <XAxis dataKey="name" stroke="#555" />
              <YAxis
  stroke="#555"
  domain={[0, "dataMax + 100"]}
/>

              {/* TOOLTIP */}
              <Tooltip content={<CustomTooltip />} />

              {/* 🔥 AREA COM DEGRADÊ */}
              <Area
                type="monotone"
                dataKey="vendas"
                fill="url(#colorVendas)"
                stroke="none"
              />

              {/* LINHA */}
              <Line
                type="monotone"
                dataKey="vendas"
                stroke="#ff1a1a"
                strokeWidth={3}
                dot={{ r: 5 }}
activeDot={{ r: 7 }}
              />

            </ComposedChart>
          </ResponsiveContainer>

        </div>

      </div>

    </AdminLayout>
  );
}