import React, { useEffect } from "react";

export default function Header({ menuToggle, setMenuToggle }) {
  const handleChange = () => {
    setMenuToggle(!menuToggle);
  };

  useEffect(() => {
    console.log("Menu Toggle: " + menuToggle);
  }, [menuToggle]);

  return (
    <div className="bg-[#2B2D31] h-[72px] flex flex-row items-center gap-4 ">
      <div className="h-full ">
        <button
          className="bg-[#35393F] hover:bg-[#E46643] w-[72px] h-full flex items-center justify-center"
          value={menuToggle}
          onClick={handleChange}
        >
          {/* adjust to menuToggle (true) to keep in line with rest of code */}
          {!menuToggle ? (
            <svg width="30" height="18" xmlns="http://www.w3.org/2000/svg">
              <g fill="#FFF" fillRule="evenodd">
                <path d="M0 0h30v2H0zM0 8h30v2H0zM0 16h30v2H0z" />
              </g>
            </svg>
          ) : (
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g fill="#FFF" fillRule="evenodd">
                <path d="M2.1.686 23.315 21.9l-1.415 1.415L.686 2.1z" />
                <path d="M.686 21.9 21.9.685l1.415 1.415L2.1 23.314z" />
              </g>
            </svg>
          )}
        </button>
      </div>
      <div className="font-bold text-white tracking-[5px] font-commissioner">
        MARKDOWN
      </div>
      <div className="border-r-[1px] border-[#5A6069] h-12"></div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row items-center">
          <div className=" pr-4">
            <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.107 3.393c.167.167.31.393.429.678.119.286.178.548.178.786v10.286c0 .238-.083.44-.25.607a.827.827 0 0 1-.607.25h-12a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V.857C0 .62.083.417.25.25A.827.827 0 0 1 .857 0h8c.238 0 .5.06.786.179.286.119.512.261.678.428l2.786 2.786ZM9.143 1.214v3.357H12.5c-.06-.172-.125-.294-.196-.366L9.509 1.411c-.072-.072-.194-.137-.366-.197Zm3.428 13.643V5.714H8.857a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V1.143H1.143v13.714H12.57Z"
                fill="#FFF"
              />
            </svg>
          </div>
          <div>
            <div className="text-[#C1C4CB] text-sm font-r-reg font-light ">
              Document Name
            </div>
            {/* this is where the actual file name goes. below: */}
            <div className=" text-white">welcome.md</div>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="pr-6">
            <button className="text-[#7C8187] hover:text-[#E46643]">
              <svg width="18" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          <button className="flex flex-row items-center justify-center h-[40px] w-[152px] gap-2 p-2 mr-4 text-white bg-[#E46643] hover:bg-[#F39765] rounded-[4px]">
            <svg width="17" height="17" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.91 5.931 10.575.598A.889.889 0 0 0 10.29.41.969.969 0 0 0 9.945.34H2.834A2.667 2.667 0 0 0 .167 3.007v10.666a2.667 2.667 0 0 0 2.667 2.667H13.5a2.667 2.667 0 0 0 2.667-2.667v-7.11a.889.889 0 0 0-.258-.632ZM5.5 2.118h3.556v1.778H5.5V2.118Zm5.334 12.444H5.5v-2.666c0-.491.398-.89.89-.89h3.555c.49 0 .889.399.889.89v2.666Zm3.555-.889c0 .491-.398.89-.889.89h-.889v-2.667a2.667 2.667 0 0 0-2.666-2.667H6.389a2.667 2.667 0 0 0-2.666 2.667v2.666h-.89a.889.889 0 0 1-.888-.889V3.007c0-.491.398-.89.889-.89h.889v2.667c0 .491.398.89.888.89h5.334c.49 0 .889-.399.889-.89V3.371l3.555 3.556v6.746Z"
                fill="#FFF"
              />
            </svg>
            <div className="text-sm">Save Changes</div>
          </button>
        </div>
      </div>
    </div>
  );
}
