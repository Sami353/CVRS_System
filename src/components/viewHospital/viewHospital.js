import React, { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient.js";
import "./viewHospital.css";

const ViewHospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      const { data, error } = await supabase.from("hospitals").select("*");
      if (error) {
        console.error("Error fetching hospitals:", error);
      } else {
        setHospitals(data);
      }
      setLoading(false);
    };

    fetchHospitals();
  }, []);

  return (
    <div className="view-hospitals">
      <h2>Hospital Records</h2>
      {loading ? (
        <p>Loading hospitals...</p>
      ) : hospitals.length === 0 ? (
        <p>No hospital records available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital) => (
              <tr key={hospital.id}>
                <td>{hospital.id}</td>
                <td>{hospital.name}</td>
                <td>{hospital.location}</td>
                <td>{hospital.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewHospital;





// const ViewHospital = () => {
//   const [hospitals, setHospitals] = useState([]);

//   useEffect(() => {
//     // Fetch hospitals from the backend (replace the mock data with actual API calls)
//     const mockData = [
//       {
//         id: 1,
//         name: "A-one clinic",
//         location: "Teku",
//         contact: "9876543210",
//       },
//       {
//         id: 2,
//         name: "Bir Hospital",
//         location: "Kathmandu",
//         contact: "9865432109",
//       },
//     ];
//     setHospitals(mockData);
//   }, []);

//   return (
//     <div className="view-hospitals">
//       <h2>Hospital Records</h2>
//       {hospitals.length === 0 ? (
//         <p>No hospital records available.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Location</th>
//               <th>Contact</th>
//             </tr>
//           </thead>
//           <tbody>
//             {hospitals.map((hospital) => (
//               <tr key={hospital.id}>
//                 <td>{hospital.id}</td>
//                 <td>{hospital.name}</td>
//                 <td>{hospital.location}</td>
//                 <td>{hospital.contact}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewHospital;
