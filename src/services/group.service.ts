import { Service, Inject } from "typedi";
import { WordRepository } from "../repositories/word.repository";
import { GroupRepository } from "../repositories/group.repository";

@Service()
export class GroupService {
  constructor(
    @Inject() private readonly wordRepository: WordRepository,
    @Inject() private readonly groupRepository: GroupRepository
  ) {}

  async getLastOne() {
    try {
      const lastCreatedGroup = await this.groupRepository.findLastOne();

      if (!lastCreatedGroup) {
        return {
          message: "Group is missing.",
        };
      }

      const wordsByGroup = await this.wordRepository.findAllByGroup(
        lastCreatedGroup._id
      );

      return {
        group: {
          name: lastCreatedGroup.name,
          words: wordsByGroup,
        },
      };
    } catch (error) {
      console.log("Error :", error);

      return {
        message: "Something went wrong.",
      };
    }
  }

  async getAll() {
    try {
      const groups = await this.groupRepository.findAll();

      return { groups };
    } catch (error) {
      console.log("Error :", error);

      return {
        message: "Something went wrong.",
      };
    }
  }
}
