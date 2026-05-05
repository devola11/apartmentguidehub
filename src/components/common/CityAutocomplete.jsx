// src/components/common/CityAutocomplete.jsx
// Reusable city search input with a suggestion dropdown.
//
// Props:
//   value            - controlled input value (string)
//   onChange         - called with the new string on every keystroke or selection
//   onConfirm        - optional: called with the city string when a suggestion is
//                      confirmed via keyboard Enter. Use this to trigger side-effects
//                      (e.g. form navigation) that need the selected value immediately,
//                      since React state from onChange may not have flushed yet.
//   placeholder      - input placeholder text
//   wrapperClassName - classes applied to the outer <div> (e.g. sizing, flex-1)
//   inputClassName   - classes applied to the <input> itself (styling only)
//
// Behaviour:
//   - Filters CITIES by city or state substring match (case-insensitive)
//   - Shows max 5 suggestions in a dropdown below the input
//   - Dropdown shows "City, State" - clicking fills input with just the city name
//   - Escape or click-outside closes the dropdown
//   - ArrowDown/ArrowUp navigates suggestions; Enter selects the highlighted one
//     and calls onConfirm(city) so the parent can act immediately (e.g. navigate)
//   - onMouseDown + e.preventDefault() on each suggestion prevents the input's
//     onBlur from firing before the click registers (a common focus-race pitfall)
//   - Full ARIA: role="combobox", aria-expanded, aria-activedescendant,
//     role="listbox", role="option" with IDs for screen-reader support

import { useId, useState, useRef, useEffect } from "react";

const CITIES = [
  // Texas
  { city: "Houston",          state: "Texas"      },
  { city: "Dallas",           state: "Texas"      },
  { city: "Austin",           state: "Texas"      },
  { city: "San Antonio",      state: "Texas"      },
  { city: "Fort Worth",       state: "Texas"      },
  { city: "El Paso",          state: "Texas"      },
  { city: "Arlington",        state: "Texas"      },
  { city: "Plano",            state: "Texas"      },
  { city: "Frisco",           state: "Texas"      },
  { city: "Irving",           state: "Texas"      },
  { city: "McKinney",         state: "Texas"      },
  { city: "Corpus Christi",   state: "Texas"      },
  { city: "Lubbock",          state: "Texas"      },
  // Oklahoma
  { city: "Oklahoma City",    state: "Oklahoma"   },
  { city: "Tulsa",            state: "Oklahoma"   },
  { city: "Norman",           state: "Oklahoma"   },
  { city: "Edmond",           state: "Oklahoma"   },
  { city: "Broken Arrow",     state: "Oklahoma"   },
  { city: "Lawton",           state: "Oklahoma"   },
  { city: "Stillwater",       state: "Oklahoma"   },
  { city: "Moore",            state: "Oklahoma"   },
  { city: "Enid",             state: "Oklahoma"   },
  { city: "Bartlesville",     state: "Oklahoma"   },
];

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#9AA0A6]">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
    </svg>
  );
}

export default function CityAutocomplete({
  value,
  onChange,
  onConfirm,
  placeholder,
  wrapperClassName = "",
  inputClassName = "",
}) {
  const uid = useId();
  const listboxId = `city-listbox-${uid}`;
  const optionId  = (i) => `city-option-${uid}-${i}`;

  const [suggestions,  setSuggestions]  = useState([]);
  const [open,         setOpen]         = useState(false);
  const [activeIndex,  setActiveIndex]  = useState(-1);
  const wrapRef = useRef(null);

  // Close when the user clicks anywhere outside this component
  useEffect(() => {
    function onMouseDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  // Reset active index whenever the suggestion list changes
  useEffect(() => { setActiveIndex(-1); }, [suggestions]);

  function handleChange(v) {
    onChange(v);
    const trimmed = v.trim();
    if (!trimmed) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const lower   = trimmed.toLowerCase();
    const matches = CITIES.filter(
      ({ city, state }) =>
        city.toLowerCase().includes(lower) ||
        state.toLowerCase().includes(lower)
    ).slice(0, 5);
    setSuggestions(matches);
    setOpen(matches.length > 0);
  }

  function handleSelect({ city }) {
    onChange(city);
    setSuggestions([]);
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(e) {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        const { city } = suggestions[activeIndex];
        handleSelect({ city });
        // onConfirm lets the parent act immediately with the selected value,
        // bypassing the async React state flush from onChange.
        onConfirm?.(city);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  const activeDescendant = open && activeIndex >= 0 ? optionId(activeIndex) : undefined;

  return (
    <div ref={wrapRef} className={`relative ${wrapperClassName}`}>
      <input
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-activedescendant={activeDescendant}
        value={value}
        onChange={e => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        className={inputClassName}
      />

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200
                     rounded-xl shadow-lg z-[150] overflow-hidden py-1"
        >
          {suggestions.map(({ city, state }, i) => (
            <li
              key={`${city}-${state}`}
              id={optionId(i)}
              role="option"
              aria-selected={i === activeIndex}
              // onMouseDown + preventDefault keeps input focused while registering the click
              onMouseDown={e => { e.preventDefault(); handleSelect({ city }); }}
              className={`flex items-center gap-2.5 px-4 py-3 text-sm min-h-[44px]
                         text-[#202124] cursor-pointer transition-colors duration-100
                         ${i === activeIndex
                           ? "bg-blue-50 text-[#1A73E8]"
                           : "hover:bg-blue-50 hover:text-[#1A73E8]"}`}
            >
              <PinIcon />
              <span>
                <span className="font-medium">{city}</span>
                <span className="text-[#5F6368]">, {state}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
