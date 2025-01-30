import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tags } from "../../src/ui/components/tagDisplay/tagDisplay";
import axios from "axios";
import { useRouter } from "next/navigation";

// Mock axios and useRouter
jest.mock("axios");
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockTags = [
  { id: 1, name: "React" },
  { id: 2, name: "TypeScript" },
];

describe("Tag Array", () => {
  beforeEach(() => {
    // Mock axios.get to return the mockTags
    mockedAxios.get.mockResolvedValue({
      data: { data: mockTags },
    });

    // Mock useRouter
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
      replace: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("shows loading state initially", () => {
    render(<Tags />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  test("displays tags after loading", async () => {
    // Wrap the render inside act to handle state updates
    await act(async () => {
      render(<Tags />);
    });

    // Wait for the tags to be displayed
    await waitFor(() => {
      mockTags.forEach((tag) => {
        expect(screen.getByText(tag.name)).toBeInTheDocument();
      });
    });
  });
});