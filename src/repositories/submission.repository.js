const Paper = require("../modals/paper.modal");
const Question = require("../modals/question.modal");
const Submission = require("../modals/submission.modal");
const Answer = require("../modals/answer.modal");

exports.submitPaper = async ({ code, studentEmail, answers }) => {

    const paper = await Paper.findOne({
        where: { code },
        include: [{ model: Question }],
    });

    if (!paper) throw new Error("Invalid paper code");

    let score = 0;
    let total = 0;

    // 👉 Get only questionIds attempted / shown
    const attemptedQuestionIds = answers.map(a => a.questionId);

    // 👉 Filter questions based on limit selection
    const questionsToEvaluate = paper.Questions
        .filter(q => attemptedQuestionIds.includes(q.id))
        .slice(0, paper.questionsToShow); // safety limit

    const submission = await Submission.create({
        paperId: paper.id,
        studentEmail,
        score: 0,
        totalMarks: 0,
    });

    for (const q of questionsToEvaluate) {

        const userAns = answers.find(a => a.questionId === q.id);

        total += q.points;

        let isCorrect = false;
        let marks = 0;

        if (userAns && userAns.selectedOption === q.correctOption) {
            isCorrect = true;
            marks = q.points;
            score += q.points;
        }

        await Answer.create({
            submissionId: submission.id,
            questionId: q.id,
            selectedOption: userAns?.selectedOption || null,
            isCorrect,
            marksAwarded: marks,
        });
    }

    await submission.update({
        score,
        totalMarks: total,
    });

    return { score, total };
};

exports.submissions = async (id) => {
    return await Submission.findAll({ where: { paperId: id } })
}