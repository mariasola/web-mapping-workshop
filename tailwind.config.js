const aspectRatio = require('@tailwindcss/aspect-ratio');
const forms = require('@tailwindcss/forms');
const lineClamp = require('@tailwindcss/line-clamp');
const prose = require('@tailwindcss/typography');

/**
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ['./src/components/**/*.@(tsx|ts)', './src/exercises/**/*.@(tsx|ts)'],
  plugins: [aspectRatio, forms, lineClamp, prose],
};
