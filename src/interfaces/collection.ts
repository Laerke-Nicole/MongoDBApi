export interface Collection extends Document {
    userId: string;
    bookId: string;
    status: 'to-read' | 'currently reading' | 'read';
    addedAt: Date;
}