export default function Menu() {
  return (
    <div className="flex flex-col items-center h-screen w-[50%] bg-[#1D1F22]">
      <div className="flex flex-col justify-center w-full p-4 gap-4">
        <div className="flex font-r-reg font-medium text-sm text-[#7C8187] tracking-[2px] pt-3">
          MY DOCUMENTS
        </div>
        <button className="flex flex-row items-center justify-center h-[40px] w-full gap-2 p-2 mt-[10px] mr-4 text-white bg-[#E46643] hover:bg-[#F39765] rounded-[4px]">
          <div className="text-sm">+ New Document </div>
        </button>
        <div className="flex flex-row pt-3 items-center gap-4">
          <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.107 3.393c.167.167.31.393.429.678.119.286.178.548.178.786v10.286c0 .238-.083.44-.25.607a.827.827 0 0 1-.607.25h-12a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V.857C0 .62.083.417.25.25A.827.827 0 0 1 .857 0h8c.238 0 .5.06.786.179.286.119.512.261.678.428l2.786 2.786ZM9.143 1.214v3.357H12.5c-.06-.172-.125-.294-.196-.366L9.509 1.411c-.072-.072-.194-.137-.366-.197Zm3.428 13.643V5.714H8.857a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V1.143H1.143v13.714H12.57Z"
              fill="#FFF"
            />
          </svg>
          <div className="flex flex-col">
            <div className="font-normal font-r-reg text-[0.8125em] text-[#7C8187]">
                {/* db createdAt to replace the below? */}
              01 April 2023
            </div>
            <div className="font-normal font-r-reg text-[0.9375em]">
                {/* same here for file name */}
              untitled-document.md
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
