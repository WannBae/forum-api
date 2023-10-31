const NewThread = require("../../Domains/threads/entities/NewThread");
const Addedthread = require("../../Domains/threads/entities/AddedThread");

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const addThread = new NewThread(useCasePayload);
    const addedThread = await this._threadRepository.addThread(addThread);
    return new Addedthread(addedThread);
  }
}

module.exports = AddThreadUseCase;
