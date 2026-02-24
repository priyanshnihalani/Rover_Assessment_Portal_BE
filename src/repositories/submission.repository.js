const Paper = require('../modals/paper.modal');
const Question = require('../modals/question.modal');
const Submission = require('../modals/submission.modal');
const Answer = require('../modals/answer.modal');
const { Op } = require('sequelize');

exports.submitPaper = async ({ code, studentName, studentEmail, answers }) => {
    const paper = await Paper.findOne({
        where: { code },
        include: [{ model: Question }],
    });

    if (!paper) throw new Error('Invalid paper code');

    let score = 0;
    let total = 0;

    const attemptedQuestionIds = answers.map((a) => a.questionId);
    const questionsToEvaluate = paper.Questions.filter((q) => attemptedQuestionIds.includes(q.id)).slice(0, paper.questionsToShow);

    const submission = await Submission.create({
        paperId: paper.id,
        studentName,
        studentEmail,
        score: 0,
        totalMarks: 0,
    });

    const totalMarks = paper.Questions.filter((q) => attemptedQuestionIds.includes(q.id));

    for (const p of totalMarks) {
        total += p.points;
    }

    for (const q of questionsToEvaluate) {
        const userAns = answers.find((a) => a.questionId === q.id);

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

exports.submissions = async (id,date) => {
const startDate = new Date(date);
startDate.setHours(0, 0, 0, 0);
const endDate = new Date(date);
endDate.setHours(23, 59, 59, 999);

    return await Submission.findAll({ where: { paperId: id,createdAt:{[Op.between]:[startDate,endDate]} } });
};
