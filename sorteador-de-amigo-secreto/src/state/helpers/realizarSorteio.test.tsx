import { realizarSorteio } from './realizarSorteio';

describe('dado um sorteio de amigo secreto', () => {
  test('cada participante não sorteie o próprio nome', () => {
    const participantes = [
      'Manuela',
      'Danilo',
      'Cristina',
      'Joana',
      'Maria',
      'Pedro',
    ];

    const sorteio = realizarSorteio(participantes);
    participantes.forEach((participante) => {
      const amigoScreto = sorteio.get(participante);
      expect(amigoScreto).not.toEqual(participante);
    });
  });
});
