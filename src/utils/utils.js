export function getCurrentUserAnswer(question, user) {
    if (question.optionOne.votes.includes(user)) {
        return 'optionOne';
    }
    if (question.optionTwo.votes.includes(user)) {
        return 'optionTwo';
    }
    return '';
}
