import React, { useState } from "react";
import { AppointmentEntity, TimeslotEntity } from "../interfaces/utils";

type Props = {
  allTimeSlots: TimeslotEntity[];
  preConfirmedAppointments: AppointmentEntity[];
  handleChooseTimeSlot: (timeslot: string) => string;
};

const TimeSlot = ({
  allTimeSlots,
  preConfirmedAppointments,
  handleChooseTimeSlot,
}: Props) => {
  const rowCount = Math.ceil(allTimeSlots.length / 6);
  const timeSlotsTwoDimension = Array.from(
    { length: rowCount },
    (_, rowIndex) => allTimeSlots.slice(rowIndex * 6, (rowIndex + 1) * 6)
  );

  // const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: any, value: any) => {
    e.preventDefault();
    e.target.className =
      "border-2 mt-8 space-x-5 space-y-10 text-xl bg-green-500";
    handleChooseTimeSlot(value);
  };

  return (
    <>
      {timeSlotsTwoDimension?.map((rowData, rowIndex) => (
        <>
          <div
            key={rowData.length}
            className="sm:grid grid-cols-6 grid-rows-1 gap-x-1 gap-y-1 my-2 "
          >
            {rowData.map((timeSlot, cellIndex) => (
              <>
                {/**If one time slot is booked by others, not allowed to book again */}
                {preConfirmedAppointments.some(
                  (obj) => obj.timeSlotValue === timeSlot.timeSlotValue
                ) ? (
                  <div
                    className="border-2 mt-8 space-x-5 space-y-10 text-xl bg-red-500"
                    key={cellIndex}
                  >
                    {timeSlot.timeSlotValue}(Occupied)
                  </div>
                ) : (
                  <div
                    className={`border-2 mt-8 space-x-5 space-y-10 text-xl bg-blue-100`}
                    //onMouseEnter={() => setIsHovered(true)}
                    key={cellIndex}
                    //onClick={() => handleChooseTimeSlot(timeSlot.timeSlotValue)}
                    onClick={(e) => handleClick(e, timeSlot.timeSlotValue)}
                  >
                    {timeSlot.timeSlotValue}
                  </div>
                )}
              </>
            ))}
          </div>

          {/**set up the horizontal line, hard code, not good solution */}
          {rowIndex == rowCount - 3 && (
            <div className="my-5 text-center bg-blue-300 text-xl ">
              12:00 - 1:30 Lunch
            </div>
          )}
          {rowIndex == rowCount - 2 && (
            <div className="my-5 text-center bg-blue-300 text-xl ">
              4:30 - 6:00 Dinner
            </div>
          )}
        </>
      ))}
    </>
  );
};

export default TimeSlot;
