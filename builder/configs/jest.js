

const test = {

};

const coverage = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  coverageReporters: ['json', 'lcov', 'text-summary', 'html'],
};

export default {
  test,
  coverage,
};
