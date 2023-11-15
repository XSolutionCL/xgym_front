import React, { useRef, useState } from "react";
import { FaCashRegister } from "react-icons/fa";
import { SiOpenaigym } from "react-icons/si";
import { TbUserCheck, TbUsersGroup } from "react-icons/tb";
import { MdOutlineFileDownload } from "react-icons/md";
import { Button, Card, DatePicker, Spin, Statistic, Typography } from "antd";
import CountUp from "react-countup";
import dayjs from "dayjs";
import { useDashboardInfo } from "../hooks/dashboard";
import { LineChart } from "../components/Charts/LineChart";


const { RangePicker } = DatePicker;
const { Title } = Typography;
const formatter = (value) => <CountUp end={value} separator="," />;

const Home = () => {

  const [rangoFechas, setRangoFechas] = useState([
    dayjs().startOf('month'),
    dayjs(),
  ]);

  const { data, isFetching } = useDashboardInfo(
    dayjs(rangoFechas[0]).format("YYYY-MM-DD"),
    dayjs(rangoFechas[1]).format("YYYY-MM-DD"),
  );

  const { ingresos, pagos } = data ? data : [];

  const { estadisticas } = data ? data : {};

  const g1Ref = useRef();
  const g2Ref = useRef();

  // export image
  const downloadImage = (ref) => {
    ref.current?.downloadImage();
  };

  if (isFetching) {
    return <Spin className="flex flex-row items-center justify-center w-full h-full" size="large" />;
 }


  return (
    <div className="flex flex-col w-full h-full gap-2 p-2">
      <div className="flex flex-row justify-end w-full gap-2">
        <RangePicker value={rangoFechas} format="DD-MM-YYYY" onChange={setRangoFechas}/>
      </div>
      {/* Graficos */}
      <div className="flex flex-col w-full gap-2 lg:flex-row lg:h-1/2">
        {/* Chart 1 Ingreso */}
        <div className="flex flex-col items-center w-full h-full p-2 rounded shadow-sm lg:w-1/2">
          <div className="flex flex-row justify-between w-full">
            <Title 
              level={4}
            >
              Ingresos Cientes
            </Title>
            <Button type="ghost" icon={<MdOutlineFileDownload title="Exportar"/>} onClick={() => downloadImage(g1Ref)}/>
          </div>
          <LineChart 
            data={ingresos || []} 
            ref={g1Ref} 
            xField="dia"
            xName="Días"
            yField="cantidad_ingresos"
            yName="Cantidad Clientes"
          />
        </div>
        {/* Chart 2 Pagos */}
        <div className="flex flex-col items-center w-full h-full p-2 rounded shadow-sm lg:w-1/2">
          <div className="flex flex-row justify-between w-full">
            <Title level={4}>Pagos Cientes</Title>
            <Button type="ghost" icon={<MdOutlineFileDownload title="Exportar"/>} onClick={() => downloadImage(g2Ref)}/>
          </div>
          <LineChart 
            data={pagos || []} 
            ref={g2Ref} 
            xField="dia"
            yField="monto_pagos"
            xName="Días"
            yName="Monto CLP"
          />
        </div>
      </div>
      {/* Statistics */}
      <div className="flex flex-col gap-2 mt-2 lg:flex-row">
        <Card bordered={false} className="w-full lg:w-1/2">
          <Statistic
            title="Clientes Totales"
            value={estadisticas.total_clientes}
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<TbUsersGroup />}
            // suffix="%"
            formatter={formatter}
          />
        </Card>
        <Card bordered={false} className="w-full lg:w-1/2">
          <Statistic
            title="Clientes Activos"
            value={estadisticas.clientes_activos}
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<TbUserCheck />}
            formatter={formatter}
            // suffix="%"
          />
        </Card>
      </div>
      <div className="flex flex-col gap-2 lg:flex-row">
        <Card bordered={false} className="w-full lg:w-1/2">
          <Statistic
            title="Total Recaudado"
            value={estadisticas.total_recaudado}
            precision={0}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<FaCashRegister />}
            formatter={formatter}
            suffix="CLP"
          />
        </Card>
        <Card bordered={false} className="w-full lg:w-1/2">
          <Statistic
            title="Planes Activos"
            value={estadisticas.planes_activos}
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<SiOpenaigym />}
            formatter={formatter}
          />
        </Card>
      </div>
    </div>
  );
};

export default Home;
