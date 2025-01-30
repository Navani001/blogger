import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecommendMap } from "@/ui/components/recommend/recommenddata";
import { redirect } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe("RecommendMap Component", () => {
  const mockData = [
    {
      url: "test-post-1",
      category: "Testing",
      read_time: "3",
      title: "Test Post 1",
      descs: "Test Description 1",
      avatar_url: "https://example.com/avatar.jpg",
      username: "testuser",
      created_at: "2024-01-01T12:00:00Z",
    },
    {
      url: "test-post-2",
      title: "Test Post 2",
      descs: "Test Description 2",
      username: "testuser2",
      created_at: "2024-01-02T12:00:00Z",
    },
  ];

  test("shows loading state when no data", () => {
    render(<RecommendMap data={[]} />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  test("renders correct number of post cards", () => {
    render(<RecommendMap data={mockData} />);
    expect(screen.getAllByText(/Test Post/)).toHaveLength(2);
  });

  test("displays fallback values when optional props are missing", () => {
    render(<RecommendMap data={mockData} />);
    expect(screen.getByText("Development")).toBeInTheDocument();
    expect(screen.getByText("5min")).toBeInTheDocument();
  });

  test("formats date correctly", () => {
    render(<RecommendMap data={mockData} />);
    expect(screen.getByText("Jan 01, 2024")).toBeInTheDocument();
  });





});
