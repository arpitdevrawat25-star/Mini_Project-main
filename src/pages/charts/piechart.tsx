import AdminSidebar from "../../components/AdminSidebar";
import { DoughnutChart } from "../../components/Charts";
import { categories } from "../../assets/data.json";

const PieCharts = () => {
	return (
		<div className="adminContainer">
			<AdminSidebar />
			<main className="chart-container">
				<h1>Career Analytics Charts</h1>

				<section>
					<div>
						<DoughnutChart
							labels={categories.map((i) => i.heading)}
							data={categories.map((i) => i.value)}
							backgroundColor={categories.map(
								(i) => `hsl(${i.value * 4},${i.value}%, 50%)`,
							)}
							legends={false}
							offset={[0, 0, 0, 80]}
						/>
					</div>
					<h2>Career Interest Categories</h2>
				</section>

				<section>
					<div>
						<DoughnutChart
							labels={[
								"Technology",
								"Analyst",
								"Creative",
								"Communication",
								"Leadership",
							]}
							data={[32, 18, 5, 20, 25]}
							backgroundColor={[
								"hsl(110,80%,40%)",
								"hsl(19,80%,40%)",
								"hsl(69,80%,40%)",
								"hsl(300,80%,40%)",
								"rgb(53, 162, 255)",
							]}
							legends={false}
							offset={[20, 30, 20, 30, 80]}
						/>
					</div>
					<h2>Skill Readiness Distribution</h2>
				</section>

				<section>
					<div>
						<DoughnutChart
							labels={["Mentors", "Students"]}
							data={[40, 250]}
							backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
							offset={[0, 80]}
						/>
					</div>
					<h2>Students & Mentors Ratio</h2>
				</section>
			</main>
		</div>
	);
};

export default PieCharts;
