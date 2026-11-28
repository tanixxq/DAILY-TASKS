export const vehicles = [
    {
      id: 1,
      name: "Toyota Fortuner",
      registration: "RJ14 AB 1234",
      health: "Good",
      nextService: "2026-12-15",
      lastService: "2026-09-15",
      records: [
        { id: 1, date: "2026-09-15", description: "Engine oil changed" },
        { id: 2, date: "2026-06-10", description: "Brake inspection" },
      ],
    },
    {
      id: 2,
      name: "Hyundai Creta",
      registration: "RJ14 CD 5678",
      health: "Warning",
      nextService: "2026-11-20",
      lastService: "2026-08-20",
      records: [
        { id: 3, date: "2026-08-20", description: "Air filter replaced" },
      ],
    },
    {
      id: 3,
      name: "Tata Nexon",
      registration: "RJ14 EF 9012",
      health: "Good",
      nextService: "2027-01-10",
      lastService: "2026-10-10",
      records: [],
    },
  ];