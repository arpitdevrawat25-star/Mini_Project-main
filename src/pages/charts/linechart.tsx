import AdminSidebar from "../../components/AdminSidebar";
import { LineChart } from "../../components/Charts";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec",
];

const LineCharts = () => {
	return (
		<div className="adminContainer">
			<AdminSidebar />
			<main className="chart-container">
				<h1>Career Growth Trends</h1>
				<section>
					<LineChart
						data={[
							200, 444, 444, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200,
						]}
						label="Students"
						borderColor="rgb(53, 162, 255)"
						backgroundColor="rgba(53, 162, 255,0.5)"
						labels={months}
					/>
					<h2>Active Students</h2>
				</section>
				<section>
					<LineChart
						data={[40, 60, 244, 100, 143, 120, 41, 47, 50, 56, 32, 70]}
						backgroundColor={"hsla(269,80%,40%,0.4)"}
						borderColor={"hsl(269,80%,40%)"}
						label="Assessments"
						labels={months}
					/>
					<h2>Assessments Taken</h2>
				</section>

				<section>
					<LineChart
						data={[
							240, 144, 241, 343, 900, 200, 256, 447, 990, 1444, 1000, 1200,
						]}
						backgroundColor={"hsla(129,80%,40%,0.4)"}
						borderColor={"hsl(129,80%,40%)"}
						label="Registrations"
						labels={months}
					/>
					<h2>Event Registrations</h2>
				</section>

				<section>
					<LineChart
						data={[90, 120, 120, 90, 10, 50, 40, 12, 11, 15, 20, 50]}
						backgroundColor={"hsla(29,80%,40%,0.4)"}
						borderColor={"hsl(29,80%,40%)"}
						label="Matches"
						labels={months}
					/>
					<h2>Career Matches Made</h2>
				</section>
			</main>
		</div>
	);
};

export default LineCharts;
