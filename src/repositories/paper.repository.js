const Paper = require("../modals/paper.modal");
const Question = require("../modals/question.modal");
const Option = require("../modals/option.modal");
const Submission = require("../modals/submission.modal");

exports.createPaper = async (payload) => {
    const paper = await Paper.create({
        code: payload.code,
        title: payload.title,
        timeLimit: payload.timeLimit,
    });

    for (const q of payload.questions) {
        const question = await Question.create({
            paperId: paper.id,
            prompt: q.prompt,
            correctOption: q.correctOption,
            points: q.points,
        });

        await Option.bulkCreate(
            q.options.map((o) => ({
                questionId: question.id,
                label: o.label,
                text: o.text,
            }))
        );
    }

    return paper;
};

exports.updatePaper = async (payload) => {
    const { id: paperId, title, timeLimit, questionsToShow, questions } = payload;

    await Paper.update(
        { title, timeLimit, questionsToShow },
        { where: { id: paperId } }
    );

    const existingQuestions = await Question.findAll({
        where: { paperId },
        include: [{ model: Option }],
    });

    const incomingQuestionIds = new Set();

    for (const q of questions) {
        let question;

        if (q.id) {
            incomingQuestionIds.add(q.id);

            await Question.update(
                {
                    prompt: q.prompt,
                    points: q.points,
                    correctOption: q.correctOption,
                },
                { where: { id: q.id } }
            );

            question = await Question.findByPk(q.id, {
                include: [{ model: Option }],
            });
        } else {
            question = await Question.create({
                paperId,
                prompt: q.prompt,
                points: q.points,
                correctOption: q.correctOption,
            });
        }

        const existingOptions = question.Options || [];
        const incomingOptionIds = new Set();

        for (const o of q.options) {
            if (o.id) {
                incomingOptionIds.add(o.id);

                await Option.update(
                    { label: o.label, text: o.text },
                    { where: { id: o.id } }
                );
            } else {
                await Option.create({
                    questionId: question.id,
                    label: o.label,
                    text: o.text,
                });
            }
        }

        for (const o of existingOptions) {
            if (!incomingOptionIds.has(o.id)) {
                await Option.destroy({ where: { id: o.id } });
            }
        }
    }

    for (const q of existingQuestions) {
        if (!incomingQuestionIds.has(q.id)) {
            await Option.destroy({ where: { questionId: q.id } });
            await Question.destroy({ where: { id: q.id } });
        }
    }

    return { success: true };
};

exports.activatePaper = async (paperId) => {
    await Paper.update({ status: "DRAFT" }, { where: {} });

    const paper = await Paper.update(
        { status: "ACTIVE" },
        { where: { id: paperId } }
    );

    return paper;
};

exports.deactivatePaper = async (paperId) => {

    const paper = await Paper.update(
        { status: "DRAFT" },
        { where: { id: paperId } }
    );

    return paper;
};


exports.getActivePaper = async () => {
    return Paper.findOne({ where: { status: "ACTIVE" } });
};

exports.findActivePaperWithQuestions = async (name, email, code) => {
    const paper = await Paper.findOne({
        where: { code, status: "ACTIVE" },
        include: [{ model: Question, include: [{ model: Option }] }],
    });

    if (!paper) return null;

    const alreadySubmitted = await Submission.findOne({
        where: {
            studentName: name,
            paperId: paper.id,
            studentEmail: email,
        },
    });

    if (alreadySubmitted) {
        return {
            alreadySubmitted: true,
            submissionId: alreadySubmitted.id,
            score: alreadySubmitted.score,
            total: alreadySubmitted.totalMarks,
        };
    }

    return {
        alreadySubmitted: false,
        paper,
    };
};

exports.deletePaper = async (paperId) => {
    const paper = await Paper.findByPk(paperId);

    if (!paper) {
        throw new Error("Paper not found");
    }

    await Paper.update(
        {
            softDelete: true,
        },
        {
            where: { id: paperId },
        }
    );

    return {
        success: true,
        message: "Paper deleted successfully",
    };
};

exports.deleteQuestion = async (questionId) => {
    const question = await Question.findByPk(questionId);

    if (!question) {
        throw new Error("Paper not found");
    }
    await Question.update(
        {
            softDelete: true,
        },
        {
            where: { id: questionId },
        }
    );
    return {
        success: true,
        message: "Question deleted successfully",
    };
};

exports.getAllPapers = async () => {
    return Paper.findAll({ where: { softDelete: false }, include: [{ model: Question, include: [{ model: Option }] }] })
}