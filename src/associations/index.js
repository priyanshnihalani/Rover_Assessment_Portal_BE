const Option = require("../modals/option.modal")
const Paper = require("../modals/paper.modal")
const Question = require("../modals/question.modal")
const Answer = require("../modals/answer.modal")
const Submission = require("../modals/submission.modal")

Paper.hasMany(Question, { foreignKey: "paperId", onDelete: "CASCADE" });
Question.belongsTo(Paper, { foreignKey: "paperId" });

Question.hasMany(Option, { foreignKey: "questionId", onDelete: "CASCADE" });
Option.belongsTo(Question, { foreignKey: "questionId" });

Paper.hasMany(Submission, { foreignKey: "paperId" });
Submission.belongsTo(Paper, { foreignKey: "paperId" });

Submission.hasMany(Answer, { foreignKey: "submissionId", onDelete: "CASCADE" });
Answer.belongsTo(Submission, { foreignKey: "submissionId" });

Question.hasMany(Answer, { foreignKey: "questionId" });
Answer.belongsTo(Question, { foreignKey: "questionId" });

module.exports = {
    Paper,
    Question,
    Option,
    Submission,
    Answer
};
