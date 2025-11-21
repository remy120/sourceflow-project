'use client';

import { useState, useEffect } from "react";
import { CaretDownOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Drawer, Collapse, Grid } from "antd";
import { useIntl } from "react-intl";
import './Header.css';

const { useBreakpoint } = Grid;

interface DropdownItem {
  key: string;
  label: string;
  href?: string;
}

interface NavLink {
  id: string;
  href?: string;
  dropdownItems?: DropdownItem[];
}

export default function Header() {
  const intl = useIntl();
  const screens = useBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer when switching from mobile to PC screen size
  useEffect(() => {
    if (screens.md && drawerOpen) {
      setDrawerOpen(false);
    }
  }, [screens.md, drawerOpen]);

  const navLinks: NavLink[] = [
    {
      id: 'footer.forJobseekers',
      dropdownItems: [
        { key: 'service1', label: 'Service 1', href: '/services/1' },
        { key: 'service2', label: 'Service 2', href: '/services/2' },
      ],
    },
    {
      id: 'footer.forClients',
      dropdownItems: [
        { key: 'service1', label: 'Service 1', href: '/services/1' },
        { key: 'service2', label: 'Service 2', href: '/services/2' },
      ],
      href: '/about',
    },
    {
      id: 'footer.sectors',
      dropdownItems: [
        { key: 'service1', label: 'Service 1', href: '/services/1' },
        { key: 'service2', label: 'Service 2', href: '/services/2' },
      ],
      href: '/about',
    },
    {
      id: 'footer.resources',
      dropdownItems: [
        { key: 'service1', label: 'Service 1', href: '/services/1' },
        { key: 'service2', label: 'Service 2', href: '/services/2' },
      ],
      href: '/about',
    }
  ];

  const renderNavLink = (navLinks: NavLink[]) => (
    navLinks.map(link => {
      if (link.dropdownItems && link.dropdownItems.length > 0) {
        const menuItems: MenuProps['items'] = link.dropdownItems.map((item) => ({
          key: item.key,
          label: item.href ? (
            <a href={item.href}>
              {item.label}
            </a>
          ) : (
            item.label
          )
        }));

        return (
          <Dropdown
            key={link.id}
            menu={{ items: menuItems }}
            trigger={["hover", "click"]}
          >
            <span className="nav-link cursor-pointer flex flex-row gap-1">
              <span className="whitespace-nowrap small-text">
                {intl.formatMessage({ id: link.id })}
              </span>
              <CaretDownOutlined style={{ fontSize: '10px', color: "#064EA4" }} />
            </span>
          </Dropdown>
        );
      }

      return (
        <a key={link.id} href={link.href} className="nav-link">
          {intl.formatMessage({ id: link.id })}
        </a>
      );
    })
  );

  const renderMobileNavLink = (navLinks: NavLink[]) => {
    const items = navLinks.map(link => {
      if (link.dropdownItems && link.dropdownItems.length > 0) {
        return {
          key: link.id,
          label: intl.formatMessage({ id: link.id }),
          children: (
            <div className="flex flex-col space-y-2 pl-4">
              {link.dropdownItems.map(item => (
                <a
                  key={item.key}
                  href={item.href}
                  className="py-2 text-gray-700 hover:text-blue-700"
                  onClick={() => setDrawerOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          ),
        };
      }
      return {
        key: link.id,
        label: (
          <a
            href={link.href}
            className="text-gray-700 hover:text-blue-700"
            onClick={() => setDrawerOpen(false)}
          >
            {intl.formatMessage({ id: link.id })}
          </a>
        ),
      };
    });

    return <Collapse items={items} ghost bordered={false} />;
  };

  const onUploadCV = () => {
    console.log("Upload CV clicked");
  }

  const onContactUs = () => {
    console.log("Contact us clicked")
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 space-x-2">
          <div className="flex items-center gap-2 md:gap-8">
            <div className="p-2 md:hidden">
              <MenuOutlined
                onClick={() => setDrawerOpen(true)}
              />
            </div>
            <div className="hidden md:flex large-text font-semibold blue-text">
              {intl.formatMessage({ id: 'header.companyName' })}
            </div>
            <nav className="hidden md:flex md:space-x-4 lg:space-x-8">
              {renderNavLink(navLinks)}
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="btn-yellow hidden md:inline-block" onClick={onUploadCV}>
              {intl.formatMessage({ id: 'header.uploadCV' })}
            </Button>
            <Button className="btn-red hidden md:inline-block" onClick={onContactUs}>
              {intl.formatMessage({ id: 'header.contactUs' })}
            </Button>
          </div>
        </div>
      </div>

      <Drawer
        title={intl.formatMessage({ id: 'header.companyName' })}
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={300}
        closeIcon={<CloseOutlined />}
      >
        <div className="flex flex-col space-y-4">
          {renderMobileNavLink(navLinks)}
        </div>
      </Drawer>
    </header >
  );
}
