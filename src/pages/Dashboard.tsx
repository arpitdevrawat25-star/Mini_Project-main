import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import AdminSidebar from "../components/AdminSidebar";
import userImg from "../assets/user.png";
import { FaRegBell } from "react-icons/fa";
import data from "../assets/data.json";
import { BarChart, DoughnutChart } from "../components/Charts";
import { BiMaleFemale } from "react-icons/bi";
import Table from "../components/DashboardTable";
import { useCareer } from "../CarrierContext";

interface Stats {
  total: number;
  active: number;
  levels: { beginner: number; intermediate: number; advanced: number };
  readiness: { heading: string; value: number }[];
  careers: { name: string; count: number }[];
}

const Dashboard = () => {
  const { results } = useCareer();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const loadStats = () => {
      fetch("http://localhost:5001/stats")
        .then((res) => res.json())
        .then((d) => setStats(d))
        .catch((err) => console.log(err));
    };

    loadStats();
    const timer = setInterval(loadStats, 5000);
    return () => clearInterval(timer);
  }, []);

  const matches =
    results.length > 0 ? results.map((c) => c.match) : [40, 30, 25, 19];
  const careerNames =
    results.length > 0
      ? results.map((c) => c.name)
      : [
          "Software Developer",
          "Data Analyst",
          "Product Design Meetup",
          "UI Designer",
        ];

  const total = stats ? stats.total : 0;
  const active = stats ? stats.active : 0;
  const beginner = stats ? stats.levels.beginner : 0;
  const intermediate = stats ? stats.levels.intermediate : 0;
  const advanced = stats ? stats.levels.advanced : 0;
  const readiness = stats ? stats.readiness : data.categories;

  const share = (value: number) =>
    total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for Data" />
          <img src={userImg} alt="User" />
          <FaRegBell />
        </div>

        <section className="widgetcontainer">
          <WidgetItem
            percent={total > 0 ? 100 : 0}
            value={total}
            heading="Total Assessments"
            color="rgb(0,115,255)"
          />
          <WidgetItem
            percent={share(active)}
            value={active}
            heading="Active Students"
            color="rgb(0,198,202)"
          />
          <WidgetItem
            percent={share(beginner)}
            value={beginner}
            heading="Beginners"
            color="rgb(255, 196, 0)"
          />
          <WidgetItem
            percent={share(intermediate)}
            value={intermediate}
            heading="Intermediate"
            color="rgb(76, 0, 255)"
          />
        </section>

        <section className="graphContainer">
          <div className="revenue-chart">
            <h2>Carrer Compatibility </h2>
            <BarChart
              data1={matches}
              labels={careerNames}
              title_1="Match"
              bg_color1="rgb(0,155,255)"
            />
          </div>
          <div className="dashboard-categories">
            <h2>Skill Readiness Overview</h2>
            <div>
              {readiness.map((i) => (
                <CategoryItem
                  key={i.heading}
                  heading={i.heading}
                  value={i.value}
                  color={`hsl(${i.value * 4}, ${i.value}% , 50%)`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="transaction-container">
          <div className="genderchart">
            <h2>Student Experience Levels</h2>
            <DoughnutChart
              labels={["Beginner", "Intermediate", "Advanced"]}
              data={[beginner, intermediate, advanced]}
              backgroundColor={[
                "hsl(340 , 82%,56%)",
                "rgba(53,162,235,0.8)",
                "rgb(255,196,0)",
              ]}
              cutout={75}
            />
            <p>
              <BiMaleFemale />
            </p>
          </div>

          <Table data={data.transaction} />
        </section>
      </main>
    </div>
  );
};

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: WidgetItemProps) => (
  <article className="widget">
    <div className="widgetinfo">
      <p>{heading}</p>
      <h4>{amount ? `${value}%` : value}</h4>
    </div>

    <div
      className="widgetCircle"
      style={{
        background: `conic-gradient(
				${color} ${(Math.abs(percent) / 100) * 360}deg,
				rgb(255,255,255) 0
				)`,
      }}
    >
      <span style={{ color }}>{percent}%</span>
    </div>
  </article>
);

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="category-item">
    <h5>{heading}</h5>
    <div>
      <div
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      ></div>
    </div>

    <span>{value}%</span>
  </div>
);

export default Dashboard;
