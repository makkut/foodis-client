const TabMenu = ({ value, openTab }: any) => {
  const menu = [
    { title: "ALL", desc: "all" },
    { title: "NEW ARRIVALS", desc: "newArrivals" },
    { title: "BEST SELLERS", desc: "bestSellers" },
    { title: "TOP RATED", desc: "topRated" },
  ];
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-5">
      <ul className="flex flex-wrap -mb-px justify-center">
        {menu.map((el, index) => (
          <li className="mr-2" key={index}>
            <button
              onClick={openTab}
              className={` ${
                el.desc === value
                  ? "inline-block p-4 text-[#EF4444] border-b-2 border-[#EF4444] rounded-t-lg"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              data-index={index}
              data-el={el.desc}
            >
              {el.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TabMenu;
