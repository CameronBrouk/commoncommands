export type User = {
  uid: string
  displayName: string
  photoUrl: string
  phone: string
  email: string
  emailVerified: boolean
}

export type Permissions = {
  clearance: Clearance
  role: Role
  groups: Group[]
}

// Role is the most commonly used, but least specific Permission.
// A 'visitor' is someone who has not logged in
// a 'awaiting-approval' is a user who is logged in
// a 'customer' is a user who is logged in
// an 'employee' is a user who adds content to the site that 'customers' can use / see
// an 'admin' is a user with full permissions
// EXAMPLE: You have an app that allows patients to schedule appointments with doctors
//          a doctor is an 'employee', they add their available times
//          a patient is a 'customer', they sign up for apointment times that the doctors create
//          an 'admin' is a manager, who views the schedules of all doctors and analytics/financial info
export type Role = 'visitor' | 'awaiting-approval' | 'approved' | 'admin'

// Clearance is a simply way to show/hide elements that fit outside the 'role' heirarchy
// EXAMPLE:  You have a button that lets you 'view as <role>'.
//           This button is only visible by an admin, but it needs
//           to stay visible while you are viewing as a 'visitor' or 'customer'.
//           In this case, you would show/hide this button by clearance.
export type Clearance = 0 | 1 | 2 | 3 | 4 | 5

// Groups are a way to give permissions to a subset of users of a specific role
// EXAMPLE: You have videos that people can watch, but only if they pay you money.
// Each of these people would be a 'customer'
// Upon completion of payment, you would add
// an arbitrary group name to the current users groups
// such as 'can_watch_cat_video'.
// you would then set the UI to only show that video
// if the current user's groups contains the 'can_watch_cat_video' key
// NOTE:  there is a helper function for this in the userPermissions hook
export type Group = string
