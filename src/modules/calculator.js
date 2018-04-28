export function calculate(input) {
  if (!isNaN(input)) return input;

  input = input.replace(/\^/gi, '**');
  input = input.replace(/k/gi, '*' + String(1e3));
  input = input.replace(/m/gi, '*' + String(1e6));
  input = input.replace(/b/gi, '*' + String(1e9));
  input = input.replace(/t/gi, '*' + String(1e12));
  input = input.replace(/q/gi, '*' + String(1e15));
  input = input.replace(/[^0-9*\/()\-+.]/g, '');

  return eval(input);
}

export default {
  commands: ['c', 'calc'],
  handler: (cmd, msg) => calculate(msg),
};
