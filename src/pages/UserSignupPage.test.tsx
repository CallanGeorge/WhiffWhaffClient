import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { UserSignupPage } from "./UserSignupPage";

describe("UserSignupPage.t", () => {
  describe("Layout", () => {
    it("has header", async () => {
      const { container } = render(<UserSignupPage />);
      await screen.findByRole("heading", { name: "UserSignupPage" });
      expect(container).toMatchSnapshot();
    });
  });
});
