let mongoose = require("mongoose");

let ReadSchema = new mongoose.Schema({ correct: Boolean, providedRead: [Number], userRead: [Number] })

let SessionSchema = new mongoose.Schema({
  sessionID: String,
  fsr: String,
  reads: [ReadSchema]
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model("Session", SessionSchema);
