import { useState } from "react";
import { Link, Outlet, useParams } from "remix";
import { ROOMS, HOMEROOM_TO_ROOM_MAPPING } from "~/constants";

export default function RoomNumber() {
  const [chooseCustomRoom, setChooseCustomRoom] = useState(false);
  const { homeroomId: homeroomIdParam, roomNumber: roomNumberParam } =
    useParams();
  const defaultRoomNum = HOMEROOM_TO_ROOM_MAPPING[homeroomIdParam || ""];
  const [room, setRoom] = useState(roomNumberParam || defaultRoomNum);

  return (
    <>
      {roomNumberParam ? null : chooseCustomRoom ? (
        <>
          <h3 className="w-full text-center block text-lg">
            What room are you in?
          </h3>
          <div className="grid grid-cols-4">
            {ROOMS.map((roomItem) => (
              <div
                className="w-full h-full flex items-center justify-center"
                onClick={() => {
                  setRoom(roomItem);
                }}
                key={roomItem}
              >
                <button className="btn-secondary focus:ring-green-200">
                  {roomItem}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <Link to={`/homeroom/${homeroomIdParam}/roomNumber/${room}`}>
            <button className="btn-primary bg-green-100 hover:bg-green-200 focus:bg-green-200">
              I am room {defaultRoomNum}, the homeroom for these students
            </button>
          </Link>
          <button
            className="btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              setChooseCustomRoom(true);
            }}
          >
            We are in a different room
          </button>
        </>
      )}
      <label className={`block ${roomNumberParam ? "" : "hidden"}`}>
        Room Number
        <input
          className="rounded disabled:bg-gray-100"
          type={roomNumberParam ? "text" : "hidden"}
          disabled={!!roomNumberParam}
          name="roomNumber"
          value={room}
        />
      </label>
      <input type="hidden" name="homeroom" value={homeroomIdParam} />
      <Outlet />
    </>
  );
}
