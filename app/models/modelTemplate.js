import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  locationId: { type: String, default: "" },
  meterNumber: { type: String, default: "" },
  readings: { type: Array, default: [] },
  isDeleted: { type: Boolean, default: false },
  isInActive: { type: Boolean, default: false },
  addedOn: { type: Number, default: Date.now() },
  modifiedOn: { type: Number, default: Date.now() },
});

templateSchema.method({
  saveData: async () => this.save(),
});

templateSchema.static({
  findData: (findObj) => this.find(findObj),

  findOneData: (findObj) => this.findOne(findObj),

  findOneAndUpdateData: (findObj, updateObj) =>
    this.findOneAndUpdate(findObj, updateObj, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }),

  findDataWithAggregate: (findObj) => this.aggregate(findObj),
});

export default mongoose.model("nq-template", templateSchema);
