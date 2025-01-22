import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogHomepage from "./../../page";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

// Mock auth
// .//lib/utilis/auth

jest.mock("./../../../lib/utilis/auth", () => ({
  auth: jest.fn(() => ({
    user: {
      name: "Test User",
      email: "test@example.com",
    },
  })),
}));

// Mock components@/ui/components/recommend
jest.mock("./../../../ui/components/recommend", () => ({
  Recommend: () => <div data-testid="mock-recommend">Recommend Component</div>,
}));

jest.mock("./../../../ui/components/tagDisplay/tagDisplay", () => ({
  Tags: () => <div data-testid="mock-tags">Tags Component</div>,
}));

jest.mock("./../../../ui/components/search/search", () => ({
  Search: () => <div data-testid="mock-search">Search Component</div>,
  ContactBody: () => <div data-testid="mock-contact">Contact Component</div>,
}));

jest.mock("./../../../ui/components/card/card", () => ({
  CardAbout: () => (
    <div data-testid="mock-card-about">Card About Component</div>
  ),
}));

jest.mock("./../../../ui/components/popover/popover", () => ({
  PopOver: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-popover">{children}</div>
  ),
}));

jest.mock("./../../../lib/auth/signout-button", () => ({
  SignOut: () => <button data-testid="mock-sign-out">Sign Out</button>,
}));

describe("BlogHomepage", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test("renders main components", async () => {
    await act(async () => {
      render(<BlogHomepage />);
    });

    // Test navigation elements
    expect(screen.getByText("Blogix")).toBeInTheDocument();
    expect(screen.getByText("Write a blog")).toBeInTheDocument();

    // Test hero section
    expect(screen.getByText(/Discover/i)).toBeInTheDocument();
    expect(screen.getByText(/stories/i)).toBeInTheDocument();
    expect(screen.getByText(/that matter/i)).toBeInTheDocument();

    // Test mocked components
    expect(screen.getByTestId("mock-recommend")).toBeInTheDocument();
    expect(screen.getByTestId("mock-tags")).toBeInTheDocument();
    expect(screen.getByTestId("mock-search")).toBeInTheDocument();
    expect(screen.getByTestId("mock-card-about")).toBeInTheDocument();
  });

  test("displays user information in popover", async () => {
    await act(async () => {
      render(<BlogHomepage />);
    });

    // Find user information
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  test("contains all navigation links", async () => {
    await act(async () => {
      render(<BlogHomepage />);
    });

    // Check for navigation links
    expect(screen.getByText("Blogs Analysis")).toBeInTheDocument();
    expect(screen.getByTestId("mock-sign-out")).toBeInTheDocument();
  });

  test("displays explore blogs section", async () => {
    await act(async () => {
      render(<BlogHomepage />);
    });

    expect(screen.getByText("Explore Blogs with Tags")).toBeInTheDocument();
  });
});
