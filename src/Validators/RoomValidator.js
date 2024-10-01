import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import mongoose from "mongoose";

const create = validateRequest({
  body: z.object({
    name: z.string({ required_error: "O nome é obrigatório" }),
    users: z.array(z.custom(mongoose.isValidObjectId, "O ID do usuário não é válido")).optional(),
    maxUsers: z.number().optional(),
  }),
});

const get = validateRequest({
  params: z.object({
    id: z.string().nonempty("O código da Room não pode estar vazio"),
  }),
});

const update = validateRequest({
  body: z.object({
    code: z.string().trim().optional(),
    name: z.string().trim().optional(),
    users: z.array(z.custom(mongoose.isValidObjectId, "O ID do usuário não é válido")).max(16, "O número máximo de usuários é 16").optional(),
    show: z.boolean().optional(),
    maxUsers: z.number().optional(),
  }),
  params: z.object({
    id: z.string().nonempty("O código da Room não pode estar vazio"),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.string().nonempty("O código da Room não pode estar vazio"),

  }),
});

const addUser = validateRequest({
  body: z.object({
    users: z.array(z.custom(mongoose.isValidObjectId, "O ID do Usuário não é válido")).nonempty("A lista de usuários não pode estar vazia"),
  }),
});

export default {
  create,
  get,
  update,
  destroy,
  addUser,
};

