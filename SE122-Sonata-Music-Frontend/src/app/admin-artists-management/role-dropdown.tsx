"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

export interface RolesResponse {
  status: string;
  code: number;
  success: boolean;
  message: string;
  data: string[];
  errors: unknown | null;
}

interface DropdownRolesProps {
  roleArtist: RolesResponse | undefined;
  selectedRole?: string | null;
  onSelectRole: (role: string | null) => void;
}

const DropdownRoles: React.FC<DropdownRolesProps> = ({
  roleArtist,
  selectedRole,
  onSelectRole,
}) => {
  const [localSelectedRole, setLocalSelectedRole] = useState<string | null>(
    selectedRole ?? null
  );
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLocalSelectedRole(selectedRole ?? null);
  }, [selectedRole]);

  const handleChange = (role: string | null) => {
    setLocalSelectedRole(role);
    onSelectRole(role);
  };

  const formatRole = (role: string) => {
    return role
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const filteredRoles = useMemo(() => {
    if (!roleArtist?.data) return [];
    if (query === "") return roleArtist.data;
    return roleArtist.data.filter((role) =>
      formatRole(role).toLowerCase().includes(query.toLowerCase())
    );
  }, [roleArtist?.data, query]);

  return (
    <div className="w-full">
      {roleArtist ? (
        <Combobox value={localSelectedRole} onChange={handleChange}>
          <div className="relative">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-gray-100 text-left border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-gray-900 bg-transparent focus:outline-none"
                displayValue={(role: string | null) =>
                  role ? formatRole(role) : ""
                }
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type or select a role"
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>

            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {filteredRoles.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    No results found
                  </div>
                ) : (
                  filteredRoles.map((role) => (
                    <Combobox.Option
                      key={role}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                        }`
                      }
                      value={role}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {formatRole(role)}
                          </span>
                          {selected && (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-blue-600" : "text-blue-600"
                              }`}
                            >
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      ) : (
        <div className="text-center text-gray-500">Loading roles...</div>
      )}
    </div>
  );
};

export default DropdownRoles;
