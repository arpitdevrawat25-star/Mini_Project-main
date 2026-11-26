import type { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";
import { RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { FaChartPie, FaChartLine } from "react-icons/fa";

const Adminsidebar = () => {
	const location = useLocation();

	return (
		<aside>
			<h2>logo.</h2>
			<DivOne location={location} />
			<DivTwo location={location} />
		</aside>
	);
};

const DivOne = ({ location }: { location: Location }) => {
	return (
		<div>
			<h5>Dashboard</h5>
			<ul>
				<Li
					url="/admin/dashboard"
					text="Dashboard"
					Icon={RiDashboardFill}
					location={location}
				/>
				<Li
					url="/admin/CarrierGuidance"
					text="Career Explorer"
					Icon={RiShoppingBag3Fill}
					location={location}
				/>
				<Li
					url="/admin/Profile"
					text="Student Profile"
					Icon={IoIosPeople}
					location={location}
				/>
			</ul>
		</div>
	);
};

const DivTwo = ({ location }: { location: Location }) => {
	return (
		<div>
			<h5>Charts</h5>
			<ul>
				<Li
					url="/admin/chart/pie"
					text="Pie"
					Icon={FaChartPie}
					location={location}
				/>
				<Li
					url="/admin/chart/line"
					text="Line"
					Icon={FaChartLine}
					location={location}
				/>
			</ul>
		</div>
	);
};

interface LiProps {
	url: string;
	text: string;
	location: Location;
	Icon: IconType;
}

const Li = ({ url, text, location, Icon }: LiProps) => {
	return (
		<li
			style={{
				backgroundColor: location.pathname.includes(url)
					? "rgba( 0,115,225,0.1)"
					: "white",
			}}
		>
			<Link
				to={url}
				style={{
					color: location.pathname.includes(url) ? "rgb(0,115,225)" : "black",
				}}
			>
				<Icon />
				{text}
			</Link>
		</li>
	);
};

export default Adminsidebar;
