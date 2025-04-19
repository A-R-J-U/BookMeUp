import db from "../db.js";

const getVenues = async (req, res) => {
  try {
    const venues = await db.query("SELECT * FROM venues");

    if (venues[0].length === 0)
      return res.status(404).json({ message: "No venues found" });

    return res.status(200).json(venues[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getVenueById = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await db.query("SELECT * FROM venues WHERE venue_id = ?", [
      id,
    ]);
    if (venue[0].length === 0)
      return res.status(404).json({ message: "No venue found" });
    return res.status(200).json(venue[0][0]);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

const searchVenue = async (req, res) => {
  try {
    let { name, size, capacity } = req.query;

    const sql = `SELECT * FROM venues
                  WHERE
                    ( ? ='null' OR name LIKE CONCAT('%', ?, '%'))
                    AND ( ? ='null' OR size LIKE CONCAT('%', ?, '%'))
                    AND ( ? = 50 OR capacity >= ?)
                  LIMIT 10 ;`;

    const result = await db.query(sql, [
      name,
      name,
      size,
      size,
      capacity,
      capacity,
    ]);

    if (result[0].length == 0) return res.json({ message: "No Venues Found" });
    res.status(200).json(result[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getPopular = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM venues ORDER BY bookings DESC LIMIT 10;`
    );
    if (result[0].length == 0) return res.json({ message: "No Venues Found" });
    res.status(200).json(result[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

export { getVenues, getVenueById, searchVenue, getPopular };
