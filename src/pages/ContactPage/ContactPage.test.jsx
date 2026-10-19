import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { Header } from '@/components/layout/Header';
import { HONEYPOT_FIELD } from '@/hooks/useLeadForm';
import { company, officeAddress } from '@/data/company';
import { contactFaqs } from '@/data/faqs';

import ContactPage from './ContactPage';

/** The JSON-LD payloads `<Seo />` has injected into the document head. */
function readJsonLd() {
  return [...document.head.querySelectorAll('script[type="application/ld+json"]')].map((node) =>
    JSON.parse(node.textContent),
  );
}

function renderPage(path = '/contact') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<p>Home page</p>} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

const form = () => screen.getByRole('form', { name: /talk to our team/i });

describe('<ContactPage />', () => {
  it('opens on the conversation, not a wall of text', () => {
    renderPage();

    expect(
      screen.getByRole('heading', { level: 1, name: /talk to an aao engineer today/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/tell us what you’re dealing with and an AAO expert/i),
    ).toBeInTheDocument();

    // The trail ends on this page, as text rather than a link.
    expect(
      screen.getByText('Contact Us', { selector: '[aria-current="page"]' }),
    ).toBeInTheDocument();
  });

  it('puts the two fastest channels above the fold', () => {
    renderPage();

    const hero = screen.getByRole('heading', { level: 1 }).closest('section');

    const whatsapp = within(hero).getByRole('link', {
      name: /message us on whatsapp/i,
    });
    expect(whatsapp).toHaveAttribute('href', company.phone.whatsapp);
    expect(whatsapp).toHaveAttribute('target', '_blank');

    expect(
      within(hero).getByRole('link', {
        name: new RegExp(`call ${company.phone.display}`, 'i'),
      }),
    ).toHaveAttribute('href', company.phone.href);
  });

  it('lists every way to reach the team', () => {
    renderPage();

    const channels = screen.getByRole('list', { name: /ways to reach aao/i });

    expect(
      within(channels).getByRole('link', { name: new RegExp(company.phone.display, 'i') }),
    ).toHaveAttribute('href', company.phone.href);
    expect(within(channels).getByRole('link', { name: /message us anytime/i })).toHaveAttribute(
      'href',
      company.phone.whatsapp,
    );
    expect(
      within(channels).getByRole('link', {
        name: new RegExp(company.email.replace(/[.@]/g, (c) => `\\${c}`)),
      }),
    ).toHaveAttribute('href', `mailto:${company.email}`);
    expect(
      within(channels).getByRole('link', { name: new RegExp(officeAddress.lines[0], 'i') }),
    ).toHaveAttribute('href', officeAddress.mapUrl);

    expect(within(channels).getByText(/mon – sat, 8:00 – 18:00/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 }).closest('section')).toHaveTextContent(
      /reply within 24 hours/i,
    );
  });

  it('carries the same enquiry form as the contact section', () => {
    renderPage();

    expect(form()).toBeInTheDocument();

    [
      'Your name',
      'Phone / WhatsApp',
      'Email',
      "Service you're interested in",
      'Location',
      'How can we help?',
    ].forEach((label) => {
      expect(screen.getByLabelText(new RegExp(label, 'i'))).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /talk to our team/i })).toBeInTheDocument();
    // The spam trap stays hidden from people, exactly as on the home page.
    expect(form().querySelector(`[name="${HONEYPOT_FIELD}"]`)).not.toBeNull();
  });

  it('submits the enquiry and confirms with a reference', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText(/your name/i), 'Ada Bakare');
    await user.type(screen.getByLabelText(/phone/i), '0810 574 3694');
    await user.selectOptions(
      screen.getByLabelText(/service you're interested in/i),
      'solar-inverter',
    );
    await user.type(screen.getByLabelText(/location/i), 'Lekki Phase 1');
    await user.click(screen.getByRole('button', { name: /talk to our team/i }));

    expect(await screen.findByText(/thank you/i, {}, { timeout: 3000 })).toBeInTheDocument();
    expect(screen.getByText(/your reference/i)).toHaveTextContent(/AAO-/);
  });

  it('answers the questions visitors ask before writing', () => {
    renderPage();

    contactFaqs.forEach((faq) => {
      expect(screen.getByRole('button', { name: faq.question })).toBeInTheDocument();
    });
  });

  it('emits the breadcrumb it renders as structured data', () => {
    renderPage();

    const schema = readJsonLd().find((entry) => entry['@type'] === 'BreadcrumbList');
    expect(schema).toBeDefined();
    expect(schema.itemListElement.map((item) => item.name)).toEqual(['Home', 'Contact Us']);
  });
});

describe('navigation wiring', () => {
  function renderSite(path = '/') {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <Header />
        <Routes>
          <Route path="/" element={<p>Home page</p>} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </MemoryRouter>,
    );
  }

  it('lands on this page whenever Contact Us is clicked in the navigation', async () => {
    const user = userEvent.setup();
    renderSite('/');

    const contact = within(screen.getByRole('navigation', { name: 'Primary' })).getByRole('link', {
      name: 'Contact Us',
    });
    expect(contact).toHaveAttribute('href', '/contact');

    await user.click(contact);
    expect(
      await screen.findByRole('heading', { level: 1, name: /talk to an aao engineer/i }),
    ).toBeInTheDocument();
  });

  it('lands on this page from the header quote button', async () => {
    const user = userEvent.setup();
    renderSite('/');

    const cta = screen.getByRole('link', { name: /get a free quote/i });
    expect(cta).toHaveAttribute('href', '/contact');

    await user.click(cta);
    expect(
      await screen.findByRole('heading', { level: 1, name: /talk to an aao engineer/i }),
    ).toBeInTheDocument();
  });
});
