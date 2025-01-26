import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tags } from "../../src/ui/components/tagDisplay/tagDisplay";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockTags = [
  { id: 1, name: "React" },
  { id: 2, name: "TypeScript" },
];

describe("Tag Array", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: { data: mockTags },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("shows loading state initially", () => {
    render(<Tags />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  test("displays tags after loading", async () => {
    // Wrap the render inside act
    await act(async () => {
      render(<Tags />);
    });

    // Ensure that the state update and rendering are fully processed
    await waitFor(() => {
      mockTags.forEach((tag) => {
        expect(screen.getByText(tag.name)).toBeInTheDocument();
      });
    });
  });
});
