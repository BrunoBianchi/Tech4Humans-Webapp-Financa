import type { Config } from "jest";

const config: Config = {
  displayName: "frontend",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/app"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  clearMocks: true,

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
      },
    ],

    "\\.css$": "jest-transform-stub",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "jest-transform-stub",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverageFrom: ["app/**/*.{ts,tsx}", "!app/**/*.d.ts"],
};

export default config;
