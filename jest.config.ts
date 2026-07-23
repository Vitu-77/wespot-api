import type { Config } from "jest";

const config: Config = {
  rootDir: ".",

  testEnvironment: "node",

  moduleFileExtensions: ["ts", "js", "json"],

  testMatch: ["<rootDir>/src/**/*.spec.ts"],

  transform: {
    "^.+\\.(t|j)s$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
      },
    ],
  },

  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^test/(.*)$": "<rootDir>/test/$1",
    "^prisma-types/(.*)$": "<rootDir>/prisma-types/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  collectCoverageFrom: ["<rootDir>/src/**/*.(t|j)s"],

  coverageDirectory: "<rootDir>/coverage",
};

export default config;
