import { rest } from "msw";
import { faker } from "@faker-js/faker";

export const handlers = [
  rest.post("/api/token", (req, res, ctx) => {
    const token = crypto.randomUUID();
    localStorage.setItem("token", token);

    return res(ctx.status(200), ctx.delay(2500), ctx.json(token));
  }),
  rest.get("/api/products", (req, res, ctx) => {
    if (!localStorage.getItem("token")) {
      return res(ctx.status(403), ctx.json(new Error("Invalid auth")));
    }

    let products = [];

    for (let index = 0; index < 10; index++) {
      products.push(faker.commerce.product());
    }

    return res(
      ctx.status(200),
      ctx.delay(2500),
      ctx.json({ products: products })
    );
  }),
  rest.post("/api/member", async (req, res, ctx) => {
    const memberName = await req.json<string>();

    return res(
      ctx.status(200),
      ctx.delay(),
      ctx.json({
        name: memberName,
        address: faker.location.streetAddress(),
        job: faker.person.jobType(),
      })
    );
  }),
];
