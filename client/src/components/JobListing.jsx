import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );
    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/*  Search Filter from Hero Component */}
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4">Current Search</h3>
              <div className="mb-4 text-gray-600">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                    {searchFilter.title}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                    {searchFilter.location}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
              </div>
            </>
          )}

        <button
          onClick={(e) => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
        >
          {showFilter ? "Close" : "Filters"}
        </button>

        {/* Category Filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4">Search by Categories</h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Location Filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4 pt-14">Search by Location</h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocations.includes(location)}
                />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job listings */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest jobs
        </h3>
        <p className="mb-8">Get your desired job from top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list">
              <img
                onClick={() => setCurrentPage(Math.max(currentPage - 1), 1)}
                src={assets.left_arrow_icon}
                alt=""
              />
            </a>
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, index) => (
                <a key={index} href="#job-list">
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-100 text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}
            <a href="#job-list">
              <img
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      currentPage + 1,
                      Math.ceil(filteredJobs.length / 6)
                    )
                  )
                }
                src={assets.right_arrow_icon}
                alt=""
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;

// import { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import { assets, JobCategories, JobLocations } from "../assets/assets";
// import JobCard from "./JobCard";

// export default function JobListing() {
//   const { isSearched, searchFilter, setSearchFilter, jobs } =
//     useContext(AppContext);
//   const [showFilters, setShowFilters] = useState(true);
//   const [filteredJobs, setFilteredJobs] = useState(jobs);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Apply filters
//   useEffect(() => {
//     let result = [...jobs].reverse();
//     if (searchFilter.title) {
//       result = result.filter((job) =>
//         job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
//       );
//     }
//     if (searchFilter.location) {
//       result = result.filter((job) =>
//         job.location.toLowerCase().includes(searchFilter.location.toLowerCase())
//       );
//     }
//     setFilteredJobs(result);
//     setCurrentPage(1);
//   }, [jobs, searchFilter]);

//   const jobsPerPage = 6;
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
//   const displayedJobs = filteredJobs.slice(
//     (currentPage - 1) * jobsPerPage,
//     currentPage * jobsPerPage
//   );

//   return (
//     <div className="container mx-auto px-4 2xl:px-20 py-8">
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Filters */}
//         <aside
//           className={`${
//             showFilters ? "block" : "hidden"
//           } lg:block w-full lg:w-1/4 bg-gray-50 p-4 rounded-lg`}
//         >
//           {isSearched && (searchFilter.title || searchFilter.location) && (
//             <div className="mb-4">
//               <h4 className="font-semibold text-gray-700 mb-2">
//                 Active Search:
//               </h4>
//               <div className="flex flex-wrap gap-2">
//                 {searchFilter.title && (
//                   <span className="px-3 py-1 bg-blue-100 rounded-full text-blue-700">
//                     {searchFilter.title}
//                   </span>
//                 )}
//                 {searchFilter.location && (
//                   <span className="px-3 py-1 bg-green-100 rounded-full text-green-700">
//                     {searchFilter.location}
//                   </span>
//                 )}
//                 <button
//                   onClick={() => setSearchFilter({ title: "", location: "" })}
//                   className="ml-auto text-red-500"
//                 >
//                   Clear
//                 </button>
//               </div>
//             </div>
//           )}

//           <button
//             onClick={() => setShowFilters((prev) => !prev)}
//             className="mb-4 text-sm text-gray-600 lg:hidden"
//           >
//             {showFilters ? "Hide Filters" : "Show Filters"}
//           </button>

//           <div>
//             <h5 className="font-medium text-gray-800 mb-2">Categories</h5>
//             <ul className="space-y-2">
//               {JobCategories.map((cat, i) => (
//                 <li key={i} className="flex items-center">
//                   <input type="checkbox" id={`cat-${i}`} className="mr-2" />
//                   <label htmlFor={`cat-${i}`} className="text-gray-700">
//                     {cat}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="mt-6">
//             <h5 className="font-medium text-gray-800 mb-2">Locations</h5>
//             <ul className="space-y-2">
//               {JobLocations.map((loc, i) => (
//                 <li key={i} className="flex items-center">
//                   <input type="checkbox" id={`loc-${i}`} className="mr-2" />
//                   <label htmlFor={`loc-${i}`} className="text-gray-700">
//                     {loc}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </aside>

//         {/* Job Grid */}
//         <section className="flex-1">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">
//             Latest Jobs
//           </h3>
//           {displayedJobs.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//               {displayedJobs.map((job, idx) => (
//                 <JobCard key={idx} job={job} />
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">
//               No jobs found. Try adjusting your search.
//             </p>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center items-center gap-3 mt-6">
//               <button
//                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//               >
//                 Prev
//               </button>

//               {Array.from({ length: totalPages }).map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`px-3 py-1 rounded ${
//                     currentPage === i + 1
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-100"
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}

//               <button
//                 onClick={() =>
//                   setCurrentPage((p) => Math.min(p + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }
