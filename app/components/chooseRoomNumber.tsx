import { FunctionComponent, useState } from "react";
import { ROOMS, HOMEROOM_TO_ROOM_MAPPING } from "~/constants";

export const ChooseRoom: FunctionComponent<{
  homeroom: keyof typeof HOMEROOM_TO_ROOM_MAPPING;
  roomNumber: string;
  setRoomNumber: (room: string) => void;
  disabled: boolean;
}> = ({ homeroom, roomNumber, setRoomNumber, disabled }) => {
  const [chooseCustomRoom, setChooseCustomRoom] = useState(false);
  const defaultRoomNum = HOMEROOM_TO_ROOM_MAPPING[homeroom];
  return (
    <>
      {!disabled && (
        <>
          {chooseCustomRoom ? (
            <>
              <h3 className="w-full text-center block text-lg">
                What room are you in?
              </h3>
              <div className="flex flex-wrap gap-2">
                {ROOMS.map((roomItem) => (
                  <div
                    className="flex items-center justify-center"
                    onClick={() => {
                      setRoomNumber(roomItem);
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
              <button
                onClick={() => setRoomNumber(defaultRoomNum)}
                className="block btn-primary bg-green-100 hover:bg-green-200 focus:bg-green-200"
              >
                I am room {defaultRoomNum}, the homeroom for these students
              </button>
              <button
                className="btn-secondary block"
                onClick={() => {
                  setChooseCustomRoom(true);
                }}
              >
                We are in a different room
              </button>
            </>
          )}
        </>
      )}
      <>
        <label className={`block ${disabled ? "" : "hidden"}`}>
          Room Number
          <input
            className="rounded disabled:bg-gray-100"
            type={disabled ? "text" : "hidden"}
            readOnly
            name="roomNumber"
            value={roomNumber}
          />
        </label>
        <input type="hidden" name="homeroom" value={homeroom} />
      </>
    </>
  );
};
