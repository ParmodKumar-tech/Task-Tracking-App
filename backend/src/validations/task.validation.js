import Joi from "joi";

export const createTaskValidation=Joi.object({
    title:Joi.string().min(3).max(50).trim().required(),
    description:Joi.string().min(5).trim().required(),
    status:Joi.string().valid("Completed","In Progress", "Not Started").optional(),
})

export const updateTaskValidation=Joi.object({
    title:Joi.string().min(3).max(50).trim().required(),
    description:Joi.string().min(5).trim().required(),
    status:Joi.string().valid("Completed","In Progress", "Not Started").optional(),
}).min(1);