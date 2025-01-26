import { ContactUs } from "../../src/ui/components/contactbody/contact";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ContactUs Dialog Component", () => {
  const mockProps = {
    name: "John Doe",
    email: "john@example.com",
  };

  beforeEach(() => {
    render(<ContactUs {...mockProps} />);
  });






  describe("Form Submission", () => {
    beforeEach(async () => {
      global.fetch = jest.fn(() => Promise.resolve({ ok: true })) as jest.Mock;
      await userEvent.click(
        screen.getByRole("button", { name: /contact us/i })
      );
    });

    test("handles successful submission", async () => {
      await userEvent.type(screen.getByLabelText(/subject/i), "Valid Subject");
      await userEvent.type(
        screen.getByLabelText(/message/i),
        "Valid message content here"
      );
      await userEvent.click(
        screen.getByRole("button", { name: /send message/i })
      );

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/send",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-type": "application/json" },
        })
      );
    });

  });
});
