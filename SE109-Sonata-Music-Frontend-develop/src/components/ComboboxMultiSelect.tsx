"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Check, ChevronDown, X } from "lucide-react";
import axios from "axios";
import { ADMIN_TOKEN } from "@/constant/adminToken";

interface SelectItem {
  id: number | string;
  name: string;
  description?: string;
  picture?: string;
}

type FieldType =
  | "periods"
  | "orchestras"
  | "instruments"
  | "genres"
  | "genre"
  | "students"
  | "category"
  | "artist"
  | "composer"
  | "album"
  | "music";

interface ComboboxMultiSelectProps {
  fieldType: FieldType;
  selectedItems: SelectItem[];
  onSelect: (items: SelectItem[]) => void;
  placeholder?: string;
}

const BASE_URL = "https://api.sonata.io.vn/api/v1";

const ComboboxMultiSelect: React.FC<ComboboxMultiSelectProps> = ({
  fieldType,
  selectedItems,
  onSelect,
  placeholder = "Type to search...",
}) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<SelectItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getEndpoint = () => {
    switch (fieldType) {
      case "periods":
        return `${BASE_URL}/period/search`;
      case "orchestras":
        return `${BASE_URL}/orchestra/search`;
      case "instruments":
        return `${BASE_URL}/instrument/search`;
      case "genres":
      case "genre":
        return `${BASE_URL}/genre/search`;
      case "students":
      case "artist":
      case "composer":
        return `${BASE_URL}/artist/search`;
      case "category":
        return `${BASE_URL}/category/search`;
      case "album":
        return `${BASE_URL}/album/search`;
      case "music":
        return `${BASE_URL}/music/search`;
      default:
        return `${BASE_URL}/${fieldType}/search`;
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const requestBody = {
          filters: query
            ? [{ operator: "like", key: "name", value: query }]
            : [],
          sorts: [{ key: "name", type: "ASC" }],
        };

        const response = await axios.post(
          `${getEndpoint()}?rpp=50&page=1`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}`,
              "Content-Type": "application/json",
            },
          }
        );

        setOptions(response.data.data.items || []);
      } catch (error) {
        console.error(`Error fetching ${fieldType}:`, error);
        setOptions([]);
      }
      setLoading(false);
    };

    const debounceTimer = setTimeout(fetchOptions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, fieldType]);

  const filteredOptions = useMemo(() => {
    return options.filter(
      (opt) => !selectedItems.some((sel) => sel.id === opt.id)
    );
  }, [options, selectedItems]);

  const handleSelect = (item: SelectItem | null) => {
    if (item && !selectedItems.some((sel) => sel.id === item.id)) {
      onSelect([...selectedItems, item]);
    }
    setQuery("");
  };

  const handleRemove = (id: number | string) => {
    onSelect(selectedItems.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-1 mb-2">
        {selectedItems.map((item) => (
          <span
            key={item.id}
            className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
          >
            {item.name}
            <button
              type="button"
              onClick={() => handleRemove(item.id)}
              className="ml-1 hover:text-blue-600"
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>

      <Combobox value={null} onChange={handleSelect}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-gray-100 text-left border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-gray-900 bg-transparent focus:outline-none text-sm"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>

          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {loading ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-500">
                  Loading...
                </div>
              ) : filteredOptions.length === 0 ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  {query === "" ? "Type to search" : "No results found"}
                </div>
              ) : (
                filteredOptions.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className="block truncate text-sm">
                          {item.name}
                        </span>
                        {selected && (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-blue-600" : "text-blue-600"
                            }`}
                          >
                            <Check className="h-4 w-4" aria-hidden="true" />
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
    </div>
  );
};

export default ComboboxMultiSelect;

