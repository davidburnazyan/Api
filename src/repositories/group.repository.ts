import { Service } from "typedi";
import { Types } from "mongoose";
import Group from "../models/group";

@Service()
export class GroupRepository {

  async findAll() {
    return await Group.find();
  }

  async findById(id: Types.ObjectId) {
    return await Group.findOne({ _id: id });
  }

  async findLastOne() {
    return await Group.findOne().limit(1).sort({ $natural: -1 });
  }

  async create({ name }: any) {
    return await Group.create({ name });
  }

  async countDocuments() {
    return await Group.countDocuments();
  }
}
