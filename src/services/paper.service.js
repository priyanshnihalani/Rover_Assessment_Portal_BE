const paperRepo = require("../repositories/paper.repository.js");


const generateCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let random = "";
  for (let i = 0; i < 9; i++) {
    random += chars[Math.floor(Math.random() * chars.length)];
  }
  return `TR-${random}`;
};

exports.createPaperService = async (data) => {
  const code = generateCode();
  return paperRepo.createPaper({ ...data, code });
};

exports.updatePaperService = async (data) => {
  return paperRepo.updatePaper(data)
}

exports.activatePaperService = async (paperId) => {
  return paperRepo.activatePaper(paperId);
};

exports.deactivatePaperService = async (paperId) => {
  return paperRepo.deactivatePaper(paperId);
};

exports.startExam = async (email, code) => {
  const result = await paperRepo.findActivePaperWithQuestions(email, code);

  if (!result) {
    throw new Error("Invalid or inactive paper code");
  }

  if (result.alreadySubmitted) {
    return {
      alreadySubmitted: true,
      submissionId: result.submissionId,
      score: result.score,
      total: result.total,
    };
  }

  const paper = result.paper;
  const allQuestions = paper.Questions;

  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, paper.questionsToShow);

  return {
    alreadySubmitted: false,
    paperId: paper.id,
    title: paper.title,
    timeLimit: paper.timeLimit,
    totalQuestions: selected.length,
    questions: selected.map((q) => ({
      id: q.id,
      prompt: q.prompt,
      points: q.points,
      options: q.Options
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((o) => ({
          label: o.label,
          text: o.text,
        })),
    })),
  };
};




exports.getActivePaperService = async () => {
  return paperRepo.getActivePaper();
};

exports.getAllPapers = async () => {
  return paperRepo.getAllPapers()
}