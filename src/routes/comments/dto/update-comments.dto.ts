/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";
import { CreateCommentsDTO } from "./create-comments.dto";


export class UpdateCommentsDTO extends PartialType(CreateCommentsDTO) {}