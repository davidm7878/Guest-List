import { useEffect, useState } from "react";
import { getGuest, getGuests } from "./guests";

export default function App() {
  const [guestId, setGuestId] = useState(null);

  return (
    <>
      {!guestId ? (
        <>
          <GuestList setGuestId={setGuestId} />
        </>
      ) : (
        <GuestDetails guestId={guestId} setGuestId={setGuestId} />
      )}
    </>
  );
}

function GuestList({ setGuestId }) {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const syncGuests = async () => {
      const data = await getGuests();

      setGuests(data);
    };
    syncGuests();
  }, []);

  return (
    <article className="home">
      <h1>Guest List</h1>
      <ul className="guests">
        {guests.map((guest) => (
          <li
            className="guestLi"
            key={guest.id}
            onClick={() => setGuestId(guest.id)}
          >
            <span className="name">{guest.name}</span>{" "}
            <span>{guest.email}</span>
            <span className="phone">{guest.phone}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function GuestDetails({ guestId, setGuestId }) {
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    const syncGuest = async () => {
      if (!guestId) return;

      const data = await getGuest(guestId);
      setGuest(data);
      console.log(data);
    };
    syncGuest();
  }, [guestId]);

  if (!guest) {
    return <p>Select a guest to see more details.</p>;
  }

  return (
    <article className="guest">
      <h2>{guest.name}</h2>
      <p>{guest.email}</p>
      <p>{guest.phone}</p>
      <p>{guest.job}</p>
      <p>{guest.bio}</p>
      <button onClick={() => setGuestId(null)}>Back</button>
    </article>
  );
}
// email phone job bio
