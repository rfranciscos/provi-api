module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@controller': '<rootDir>/src/controllers',
    '@entities': '<rootDir>/src/entities',
    '@modules': '<rootDir>/src/modules',
    '@repositories': '<rootDir>/src/repositories',
    '@services': '<rootDir>/src/services',
    '@config': '<rootDir>/src/config',
    '@dto': '<rootDir>/src/dto',
  },
};
