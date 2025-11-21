'use client';

import { LinkedinFilled, FacebookFilled, InstagramFilled, TwitterOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import './Footer.css'

interface FooterLink {
  id: string;
  href: string;
}

interface FooterSection {
  titleId: string;
  links: FooterLink[];
}

interface FooterProps {
  sections?: FooterSection[];
}

export default function Footer({ sections }: FooterProps) {
  const intl = useIntl();

  const defaultSections: FooterSection[] = [
    {
      titleId: 'footer.explore',
      links: [
        { id: 'footer.homepage', href: '#' },
        { id: 'footer.forJobseekers', href: '#' },
        { id: 'footer.forClients', href: '#' },
        { id: 'footer.ourSectors', href: '#' },
        { id: 'footer.resources', href: '#' },
        { id: 'footer.contactUs', href: '#' },
      ],
    },
    {
      titleId: 'footer.sectors',
      links: [
        { id: 'footer.softwareEngineering', href: '#' },
        { id: 'footer.devOps', href: '#' },
        { id: 'footer.cloud', href: '#' },
        { id: 'footer.infrastructure', href: '#' },
        { id: 'footer.testing', href: '#' },
        { id: 'footer.security', href: '#' },
      ],
    },
    {
      titleId: 'footer.services',
      links: [
        { id: 'footer.navItem', href: '#' },
        { id: 'footer.navItem', href: '#' },
        { id: 'footer.navItem', href: '#' },
        { id: 'footer.navItem', href: '#' },
      ],
    },
  ];

  const footerSections = sections || defaultSections;

  return (
    <footer className="blue-bg white-text py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="small-text font-bold mb-4">
              {intl.formatMessage({ id: 'header.companyName' })}
            </h3>
            <div className="flex space-x-4">
              <LinkedinFilled className="social-icon" />
              <FacebookFilled className="social-icon" />
              <InstagramFilled className="social-icon" />
              <TwitterOutlined className="social-icon" />
            </div>
          </div>

          {/* Dynamic Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <div className="footer-heading large-text">
                {intl.formatMessage({ id: section.titleId })}
              </div>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="footer-link small-text">
                      {intl.formatMessage({ id: link.id })}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
