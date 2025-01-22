import { render, screen } from "@testing-library/react";
import { MetricCard } from "../../../ui/components/metriccard/metricCard";
import "@testing-library/jest-dom";
import 'cross-fetch/polyfill';
describe("MetricCard", () => {
  const defaultProps = {
    title: "Total Users",
    value: "1,234",
    subtitle: "Last 30 days",
    icon: "👤",
  };

  test("renders all props correctly", () => {
    render(
      <MetricCard
        title={"Total Users"}
        value={"1,234"}
        subtitle={"Last 30 days"}
        icon={"👤"}
      />
    );

    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("1,234")).toBeInTheDocument();
    expect(screen.getByText("Last 30 days")).toBeInTheDocument();
    expect(screen.getByText("👤")).toBeInTheDocument();
  });
});
