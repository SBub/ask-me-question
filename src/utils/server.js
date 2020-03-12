const FAILURE_RATE = 0.25;
const MIN_RESPONSE_TIME = 120;
const MAX_RESPONSE_TIME = 2500;
const MIN_OTHER_USERS_WAIT = 5000;
const MAX_OTHER_USERS_WAIT = 20000;

export default {
  fetchRoom: roomId =>
    pretend((resolve, reject) => () => {
      const idx = parseInt(roomId) % Qs.length;
      if (Math.random() <= FAILURE_RATE) {
        reject(new Error('RequestFailed'));
      } else {
        const Q = Qs[idx];
        const room = (DB[roomId] = DB[roomId] || {id: roomId, question: Q});
        const Qanswers = room.answers || {};
        answers.forEach(a => (Qanswers[a] = Qanswers[a] || 0));
        room.answers = Qanswers;
        resolve(room);
      }
    }),

  fetchRandomRoom: () => {
    return module.exports.fetchRoom(randint(Qs.length));
  },

  submitAnswer: (roomId, answer) =>
    pretend((resolve, reject) => () => {
      const room = DB[roomId];
      if (!room || answers.indexOf(answer) < 0) {
        console.log(roomId, room, answer, answers);
        reject(new Error('BadRequest'));
      } else {
        room.answers[answer]++;
        resolve(room);
      }
    }),
};

const randint = max => Math.floor(Math.random() * max);
const pickRando = arr => arr[randint(arr.length)];
const randBetween = (min, max) => min + Math.random() * (max - min);
const pretend = cb =>
  new Promise((resolve, reject) => {
    setTimeout(
      cb(resolve, reject),
      randBetween(MIN_RESPONSE_TIME, MAX_RESPONSE_TIME),
    );
  });

const Qs = [
  'Do you like space westerns?',
  'Do you think SSI can?',
  'Is the sun bigger than the earth?',
  'Is astrological sign useful to ascertain personality compatibility between people?',
  'Do you enjoy reading science fiction comedy?',
];

const answers = ['Yes', 'No'];

const DB = {
  1337: {[answers[0]]: 101, [answers[1]]: 0, whatISthisEVEN: 'lol'},
};
