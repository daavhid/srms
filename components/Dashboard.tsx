import React from 'react'
import AdminDashboard from './adminDashboard'
import StaffDashboard from './staffDashboard'
import StudentDashboard from './studentDashboard'

const Dashboard = ({user}:{user:any}) => {
  return (
    <div>
        {user === 'SUPERADMIN'&&<AdminDashboard/>}
        {user === 'ADMIN'&&<AdminDashboard/>}
        {user === 'STAFF'&&<StaffDashboard/>}
        {user === 'STUDENT'&&<StudentDashboard/>}
    </div>
  )
}

export default Dashboard