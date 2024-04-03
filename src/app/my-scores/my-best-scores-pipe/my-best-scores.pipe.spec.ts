import { MyBestScoresPipe } from './my-best-scores.pipe';

describe('MyBestScoresPipe', () => {
  it('create an instance', () => {
    const pipe = new MyBestScoresPipe();
    expect(pipe).toBeTruthy();
  });
});
