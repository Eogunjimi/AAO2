/**
 * Copy for the sidebar quote form used on service and service-area pages.
 *
 * Deliberately shaped like `heroQuote` in `./home.js`: the two forms are the
 * same conversion path in different places, so keeping their content models
 * identical makes it obvious when one says something the other does not.
 */
export const quoteForm = {
  titleLead: 'Get your',
  titleAccent: 'free site inspection',
  fields: {
    name: { label: 'Name', placeholder: 'Name' },
    phone: { label: 'Phone or WhatsApp number', placeholder: 'Phone / WhatsApp' },
    service: { label: "Service you're interested in", placeholder: 'Select service' },
  },
  submit: 'Get my free quote',
  submitting: 'Sending…',
  note: 'No spam. An AAO expert responds within 24 hours.',
};
