import { render, screen, fireEvent } from "@testing-library/react";
import { AnalysisTable } from "././../../../ui/components/table";
import "@testing-library/jest-dom";

describe("AnalysisTable", () => {
  const mockRows = [
    { id: 1, title: "Test 1", url: "url1", status: "active", desc: "desc1" },
    { id: 2, title: "Test 2", url: "url2", status: "inactive", desc: "desc2" },
    { id: 3, title: "Test 3", url: "url3", status: "active", desc: "desc3" },
  ];

  const mockHandleView = jest.fn();

  // Basic rendering test
  test("rendering title url desc in mock data ", () => {
    render(<AnalysisTable rows={mockRows} />);
    expect(screen.getByText("Test 1")).toBeInTheDocument();
    expect(screen.getByText("url1")).toBeInTheDocument();

    expect(screen.getByText("desc1")).toBeInTheDocument();
  });
  test("not rendering removed column in mock data ", () => {
    render(<AnalysisTable rows={mockRows} coloumn_remove={["id", "title"]} />);
    expect(screen.queryByText("Title")).not.toBeInTheDocument();
  });
  test("handle view buttons", () => {
    render(<AnalysisTable rows={mockRows} handleView={mockHandleView} />);

    // Get all view buttons
    const viewButtons = screen.getAllByRole("button", { name: "view" });

    // Check number of buttons matches rows
    expect(viewButtons).toHaveLength(mockRows.length);

    // Check first button properties
    expect(viewButtons[0]).toHaveClass(
      "MuiButtonBase-root",
      "MuiIconButton-root",
      "MuiIconButton-sizeSmall"
    );

    // Test click handler
    fireEvent.click(viewButtons[0]);
    expect(mockHandleView).toHaveBeenCalledWith(mockRows[0]);

    // Check emoji content
    expect(viewButtons[0]).toHaveTextContent("👁️");
  });
});
