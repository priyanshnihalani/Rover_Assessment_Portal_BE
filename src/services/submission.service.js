const submissionRepo = require("../repositories/submission.repository.js");

exports.submitPaperService = async (data) => {
  return submissionRepo.submitPaper(data);
};

exports.submissionsService = async (id) => {
  return submissionRepo.submissions(id)
}