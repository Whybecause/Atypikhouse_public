module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/test"],
  collectCoverage: true,
  moduleNameMapper: {
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],
  "transform": {
    // eslint-disable-next-line no-useless-escape
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }]
  },
  // eslint-disable-next-line no-useless-escape
  testRegex: "((\.|\/)(test|spec))\.tsx?$",
  moduleFileExtensions: ["jsx", "js", "ts", "tsx", "node"]
};
