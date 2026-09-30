/** Customer reviews syndicated from Google and Facebook. */

/**
 * @typedef {Object} Review
 * @property {string} id
 * @property {string} quote
 * @property {string} author
 * @property {string} location
 * @property {'Google'|'Facebook'} source
 * @property {number} rating
 * @property {string} [avatar] Square portrait in `public/images/`. Falls back
 *   to the author's initials when omitted.
 */

/** @type {Review[]} */
export const reviews = [
  {
    id: 'bakare',
    quote:
      "They assessed our load before recommending anything. Final quote matched the bill we were shown — no surprises, neat wiring, and the house hasn't seen a generator since.",
    author: 'Mrs. A. Bakare',
    location: 'Lekki Phase 1',
    source: 'Google',
    rating: 5,
    avatar: '/images/review-avatar-bakare.jpg',
  },
  {
    id: 'okonkwo',
    quote:
      'Installed an 8-camera CCTV system with remote viewing on my phone. Clean cabling, labelled everything, and trained my family on the app before leaving.',
    author: 'T. Okonkwo',
    location: 'Magodo GRA',
    source: 'Google',
    rating: 5,
    avatar: '/images/review-avatar-okonkwo.jpg',
  },
  {
    id: 'adeyemi',
    quote:
      "Professional from the free site visit to after-sales. They even called a week later to check the system. That's accountability you rarely see.",
    author: 'Engr. E. Adeyemi',
    location: 'Ikeja GRA',
    source: 'Facebook',
    rating: 5,
    avatar: '/images/review-avatar-adeyemi.jpg',
  },
  {
    id: 'fernandez',
    quote:
      'Our shop runs on their solar setup now. Diesel costs dropped by more than half in the first two months. Original panels, proper warranty papers.',
    author: 'L. Fernandez',
    location: 'Ajah',
    source: 'Google',
    rating: 5,
    avatar: '/images/review-avatar-fernandez.jpg',
  },
  {
    id: 'adewale',
    quote:
      "Automatic gate + intercom done in three days, exactly as quoted. The finishing is so neat you'd think it came with the house.",
    author: 'B. Adewale',
    location: 'VGC',
    source: 'Facebook',
    rating: 5,
    avatar: '/images/review-avatar-adewale.jpg',
  },
  {
    id: 'chukwu',
    quote:
      "Honest people. They told us our existing inverter was fine and only needed a battery upgrade instead of selling us a whole new system. We'll never use anyone else.",
    author: 'F. Chukwu',
    location: 'Yaba',
    source: 'Google',
    rating: 5,
    avatar: '/images/review-avatar-chukwu.jpg',
  },
];
