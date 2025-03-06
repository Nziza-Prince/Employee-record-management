import mongoose, { Schema, Document, Model } from 'mongoose';

interface Record {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  role: "ADMIN" | "STAFF";
  createdAt: Date;
  updatedAt: Date;
}

interface RecordDocument extends Record, Document {}

const recordSchema: Schema = new Schema<RecordDocument>({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  role: {
    type: String,
    enum: ["ADMIN", "STAFF"],
    default: "STAFF"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Automatically update `updatedAt` before saving a document
recordSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

// Update `updatedAt` for update operations
recordSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

const Record: Model<RecordDocument> = mongoose.models.Record || mongoose.model<RecordDocument>('Record', recordSchema);
export default Record;
