export class Note {
  constructor(
    public readonly id: number,
    public title: string,
    public content?: string,
    public userId?: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  static async findAll(params: { userId: number }) {
    return MOCK_NOTES.filter(({ userId }) => userId === params.userId).map((note) => ({
      id: note.id,
      title: note.title,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    }));
  }

  static async findOne(params: { id: number }) {
    return MOCK_NOTES.find(({ id }) => id === params.id) || null;
  }

  static async create(params: { title: string; content: string; userId: number }) {
    const id = Math.max(0, ...MOCK_NOTES.map(({ id }) => id)) + 1;
    const note = new Note(id, params.title, params.content, params.userId);
    MOCK_NOTES.push(note);
    return note;
  }

  async update(params: { title: string; content: string; userId: number }) {
    const note = MOCK_NOTES.find(({ id }) => id === this.id);
    if (!note) {
      return;
    }
    note.title = params.title;
    note.content = params.content;
    note.userId = params.userId;
  }

  async delete() {
    const indexToDelete = MOCK_NOTES.findIndex((note) => note.id === this.id);
    if (indexToDelete < 0) {
      return;
    }
    MOCK_NOTES.splice(indexToDelete, 1);
  }
}

export const MOCK_NOTES: Note[] = [];
