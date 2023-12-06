// jest.config.js
module.exports = {
  // Utilise ts-jest pour les fichiers .ts et .tsx
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  // Ignore les transformations de node_modules sauf pour les modules spécifiques qui doivent être transformés
  transformIgnorePatterns: ['/node_modules/'],
  // Pour le support des modules ES, tu peux aussi avoir besoin de définir "moduleFileExtensions"
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
};
