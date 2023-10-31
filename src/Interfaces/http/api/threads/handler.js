const AddThreadUseCase = require("../../../../Applications/use_case/AddThreadUseCase");
const GetThreadByIdUseCase = require("../../../../Applications/use_case/GetThreadById");

class ThreadHandler {
  constructor(container) {
    this._container = container;
    this.handlePostThread = this.handlePostThread.bind(this);
    this.handleGetThreadById = this.handleGetThreadById.bind(this);
  }

  async handlePostThread({ payload, auth }, h) {
    const { title, body } = payload;
    const ownerId = auth.credentials.id;

    const threadData = {
      title,
      body,
      owner: ownerId,
    };

    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(threadData);

    const response = h
      .response({
        status: "success",
        message: "Thread berhasil ditambahkan",
        data: {
          addedThread,
        },
      })
      .code(201);

    return response;
  }

  async handleGetThreadById(request) {
    const threadId = request.params.threadId;
    const getThreadByIdUseCase = this._container.getInstance(
      GetThreadByIdUseCase.name
    );
    const thread = await getThreadByIdUseCase.execute(threadId);

    return {
      status: "success",
      data: {
        thread,
      },
    };
  }
}

module.exports = ThreadHandler;
