import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

function DoctorAppointments() {

  const { doctorToken, appointments, getAppointments, completeAppointment, cancelAppointment } =
    useContext(DoctorContext)

  const { calculateAge, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (doctorToken) {
      getAppointments()
    }
  }, [doctorToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto'>

        {/* Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] px-6 py-3 border-b font-medium'>
          <p>#</p>
          <p>Patients</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p className='text-center'>Action</p>
        </div>

        {/* Rows */}
        {appointments.slice().reverse().map((item, index) => (
          <div
            key={index}
            className='
              grid grid-cols-1 gap-3
              sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr]
              items-center px-6 py-3 border-b text-gray-600
              hover:bg-gray-50
            '
          >
            {/* Index */}
            <p className='hidden sm:block'>{index + 1}</p>

            {/* Patient */}
            <div className='flex items-center gap-2'>
              <img
                className='w-8 h-8 rounded-full object-cover'
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>

            {/* Payment */}
            <p className='text-xs inline-block w-fit border border-[#5f6fff] px-2 py-0.5 rounded-full'>
              {item.payment ? 'Online' : 'Pending'}
            </p>

            {/* Age */}
            <p className='hidden sm:block'>
              {calculateAge(item.userData.dob) || '—'}
            </p>

            {/* Date */}
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Fees */}
            <p>{item.amount}</p>

            {/* Action */}
            <div className='flex justify-start sm:justify-center'>
              {item.cancelled ? (
                <p className='text-red-500 text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs font-medium'>Completed</p>
              ) : (
                <div className='flex gap-2'>
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className='w-9 cursor-pointer'
                    src={assets.cancel_icon}
                    alt="cancel"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className='w-9 cursor-pointer'
                    src={assets.tick_icon}
                    alt="complete"
                  />
                </div>
              )}
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default DoctorAppointments
