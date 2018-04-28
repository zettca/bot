const ANSWERS = [
  'Yes',
  'No',
  'Maybe',
  'Penis is the answer',
  'There is no answer to that',
  'Sex will solve that',
  'Crying will solve that',
  'Obviously',
  'Obviously not',
  'Never',
  'Everyday',
  'Keep dreaming...',
  'Ask somebody dumb instead',
  'Ask a human instead',
  'You shouldn\'t ask such things',
  'Google it',
  'The answer is obvious'];

export function answer(question) {
  let sum = 0;
  for (let i = 0; i < question.length; i++) sum += question.charCodeAt(i);
  return ANSWERS[Math.floor(sum) % ANSWERS.length];
}

export default {
  commands: ['a', 'ask', 'question', 'answer', '8ball'],
  handler: (cmd, question) => answer(question),
};
