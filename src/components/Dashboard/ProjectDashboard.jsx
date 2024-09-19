import React from "react";
import { Sidebar, Navbar, Dropdown } from "flowbite-react";
import { Outlet, Link } from "react-router-dom";

const ProjectDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar aria-label="Sidebar" className="w-1/5 h-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item>
              <Link to="projects">Projects</Link>
            </Sidebar.Item>
            <Sidebar.Item>
              <Link to="projects/new">Create Project</Link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Navbar */}
        <Navbar fluid={true} rounded={true}>
          <Navbar.Brand>
            <span className="self-center whitespace-nowrap text-xl font-semibold">
              Project Dashboard
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown label="User" inline={true}>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        </Navbar>

        {/* Main Content - Using Outlet to render routes */}
        <div className="p-4 bg-gray-100 min-h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
