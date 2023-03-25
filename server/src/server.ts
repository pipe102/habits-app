import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJWT from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import { habitSchemas } from "./modules/habits/habit.schema";
import habitsRoutes from "./modules/habits/habit.route";
import { version } from "../package.json";
import { withRefResolver } from "fastify-zod";

export const app = Fastify();

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

const main = async () => {
  for (const schema of [...userSchemas, ...habitSchemas]) {
    app.addSchema(schema);
  }

  app.register(cors);
  app.register(fastifyJWT, {
    secret: process.env.SECRETJWT || "hcasjbcdalknvdslnvsdkvdsvdsfvs",
  });
  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error) {
        return reply.send(error);
      }
    }
  );

  app.register(
    swagger,
    withRefResolver({
      routePrefix: "/docs",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "Habits App Docs",
          description: "API for the habits",
          version,
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
    })
  );

  app.register(swaggerUI, {
    routePrefix: "/docs",
    staticCSP: false,
  });

  // app.register(require("@fastify/swagger"), {});
  // app.register(require("@fastify/swagger-ui"), {
  //   routePrefix: "/docs",
  //   swagger: {
  //     info: {
  //       title: "My FirstAPP Documentation",
  //       description: "My FirstApp Backend Documentation description",
  //       version: "0.1.0",
  //       termsOfService: "https://mywebsite.io/tos",
  //       contact: {
  //         name: "John Doe",
  //         url: "https://www.johndoe.com",
  //         email: "john.doe@email.com",
  //       },
  //     },
  //     externalDocs: {
  //       url: "https://www.johndoe.com/api/",
  //       description: "Find more info here",
  //     },
  //     host: "192.168.1.214:3333",
  //     basePath: "",
  //     schemes: ["http", "https"],
  //     consumes: ["application/json"],
  //     produces: ["application/json"],
  //     tags: [
  //       {
  //         name: "User",
  //         description: "User's API",
  //       },
  //     ],
  //     definitions: {
  //       User: {
  //         type: "object",
  //         required: ["id", "email"],
  //         properties: {
  //           id: {
  //             type: "number",
  //             format: "uuid",
  //           },
  //           firstName: {
  //             type: "string",
  //           },
  //           lastName: {
  //             type: "string",
  //           },
  //           email: {
  //             type: "string",
  //             format: "email",
  //           },
  //         },
  //       },
  //     },
  //   },
  //   exposeRoute: true,
  //   staticCSP: false,
  //   openapi: {
  //     info: {
  //       title: "Fastify API",
  //       description: "API for some products",
  //       version,
  //     },
  //   },
  // });

  app.register(userRoutes, { prefix: "api/users" });
  app.register(habitsRoutes, { prefix: "api/habits" });

  app
    .listen({
      port: 3333,
      host: process.env.LOCALHOST_IP,
    })
    .then(() => {
      console.log("Server running! ✅");
    });

  app.ready((err) => {
    if (err) throw err;
    app.swagger();
  });
};

main();
