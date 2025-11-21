'use client';

import Image from "next/image";
import { useIntl } from "react-intl";
import './CompanyLogos.css';

export interface CompanyData {
  name: string;
  logo: string;
}

export default function CompanyLogos() {
  const intl = useIntl();

  const companiesData: CompanyData[] = [
    { name: "Microsoft", logo: "/images/microsoft-logo.svg" },
    { name: "Oracle", logo: "/images/oracle-logo.svg" },
    { name: "Atlassian", logo: "/images/atlassian-logo.svg" },
    { name: "Cloudflare", logo: "/images/cloudflare-logo.svg" },
    { name: "VMware", logo: "/images/vmware-logo.svg" }
  ];

  // Duplicate the array twice for seamless infinite scroll
  const duplicatedCompanies = [...companiesData, ...companiesData];

  return (
    <section className="py-12 overflow-hidden">
      <p className="text-center font-semibold small-text mb-8">
        {intl.formatMessage({ id: 'workWith.title' })}
      </p>
      <div className="logo-container">
        <div className="logo-slider">
          {duplicatedCompanies.map((company, index) => (
            <div key={`${company.name}-${index}`} className="logo-item">
              <Image
                src={company.logo}
                alt={company.name}
                width={120}
                height={40}
              />
            </div>
          ))}
          {duplicatedCompanies.map((company, index) => (
            <div key={`${company.name}-${index}-duplicate`} className="logo-item">
              <Image
                src={company.logo}
                alt={company.name}
                width={120}
                height={40}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
